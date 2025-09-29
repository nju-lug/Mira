#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import fnmatch
import glob
import json
import logging
import collections
import sys
from urllib.parse import urljoin
from distutils.version import LooseVersion
from configparser import ConfigParser
from argparse import ArgumentParser, ArgumentError

parser = ArgumentParser(
        prog = 'Mira download list generator',
        description = 'Generate download list for Mira',
    )
parser.add_argument('-d','--dir', default=None,
        help='Override root directory.'
    )
parser.add_argument('-R','--Remote', default=None,
        help='[Remote Mode] Using rsync to get file list instead of reading from local filesystem. Need the base of target site, for example, `mirror.nju.edu.cn`.'
    )
parser.add_argument('-T','--Test', default=None, nargs="*",
        help='Test specified `distro`s (multiple arguments input is supported) in INI. If Remote Mode is on, `distro`s must be specified to avoid heavy rsync job.'
    )
parser.add_argument('-D','--Debug', action="store_true", 
        help='Show log in debug level.'
    )

args = parser.parse_args()

logger = logging.getLogger(__name__)
CONFIG_FILE = os.path.join(os.path.dirname(__file__), 'genisolist.ini')


def getPlatformPriority(platform):
    platform = platform.lower()
    if platform in ['amd64', 'x86_64', '64bit']:
        return 100
    elif platform in ['arm64', 'aarch64', 'arm64v8']:
        return 95
    elif platform in ['riscv64']:
        return 95
    elif platform in ['loongson2f', 'loongson3']:
        return 95
    elif platform in ['i386', 'i486', 'i586', 'i686', 'x86', '32bit']:
        return 90
    elif platform in ['arm32', 'armhf', 'armv7']:
        return 85
    else:
        return 0


def renderTemplate(template, result):
    group_count = len(result.groups()) + 1
    for i in range(group_count):
        template = template.replace("$%d" % i, result.group(i) or "")
    return template


def getSortKeys(template, result):
    keys = []
    for i in template.split(' '):
        if not i:
            continue
        if i[0] != '$':
            keys.append(i)
        else:
            keys.append(result.group(int(i[1:])) or "")
    return keys

def parseSection(items):
    items = dict(items)

    if 'location' in items:
        locations = [items['location']]
    else:
        locations = []
        i = 0
        while ("location_%d" % i) in items:
            locations.append(items["location_%d" % i])
            i += 1

    pattern = items.get("pattern", "")
    prog = re.compile(pattern)
    images = {}
    
    for location in locations:

        if args.Remote:
            non_regex = []
            if re.search("[\\\+]", location):
                logger.warning("[WARNING] Make sure `location` is written in Unix shell-style wildcards instead of regular expression.")
            dirs = location.split("/")
            while dirs:
                if re.search("[\?\*\[\]]" , dirs[0]):
                    break
                non_regex.append(dirs.pop(0))
            rsync_url = "/".join(non_regex + [""]).lstrip("/")
            logger.debug("[RSYNC] %s on %s" % (rsync_url, args.Remote))
            image_paths = rsyncQuery(rsync_url, "/".join(dirs))

        else:
            logger.debug("[GLOB] %s", location)
            image_paths = glob.glob(location)

        for imagepath in image_paths:
            logger.debug("[FILE] %s", imagepath)

            result = prog.search(imagepath)

            if not(result):
                logger.debug("[MATCH] None")
                continue
            else:
                logger.debug("[MATCH] %r", result.groups())

            imageinfo = {"filepath": imagepath, "distro": items["distro"]}

            for prop in ("version", "type", "platform", "category"):
                imageinfo[prop] = renderTemplate(items.get(prop, ""), result)
            if 'version' not in imageinfo:
                imageinfo['version'] = '0.0'
            sort_by = items.get("sort_by", "")
            if not(sort_by):
                imageinfo['sort_key'] = (imageinfo['version'], imageinfo['platform'], imageinfo['type'])
            else:
                imageinfo['sort_key'] = getSortKeys(sort_by, result)

            logger.debug("[JSON] %r", imageinfo)
            key = renderTemplate(items.get("key_by", ""), result)
            if key not in images:
                images[key] = []
            images[key].append(imageinfo)

    for image_group in images.values():
        if 'nosort' not in items:
            try:
                image_group.sort(key=lambda k: (LooseVersion(k['version']),
                                                getPlatformPriority(k['platform']),
                                                k['type']),
                                reverse=True)
            except TypeError as e:
                logger.error("[LooseVersion] Error: %s . `nosort` is used temporarily to ignore version sorting. To avoid this error, check `pattern` in `genisolist.ini`", e)
        versions = set()
        listvers = int(items.get('listvers', 0xFF))
        for image in image_group:
            versions.add(image['version'])
            if len(versions) <= listvers:
                yield image
            else:
                break
        logger.debug(versions)


def getDetail(image_info, urlbase):
    url = urljoin(urlbase, image_info['filepath'])
    desc = "%s (%s%s)" % (
            image_info['version'],
            image_info['platform'],
            ", %s" % image_info['type'].strip() if image_info['type'] else ''
    ) if image_info['platform'] != "" else image_info['version']

    category = image_info.get('category', 'os') or "os"
    return (desc, url, category)


def getJsonOutput(url_dict, prio={}):
    raw_top = []
    raw_normal = []
    for distro in url_dict:
        raw_choose = raw_top if distro in prio.keys() else raw_normal # 若存在优先级，优先按照优先级排序否则归入普通排序
        raw_choose.append({
            "distro": distro,
            "category": list({c for _, _, c in url_dict[distro]})[0],
            "urls": [
                {"name": name, "url": url} for name, url, _ in url_dict[distro]
            ]
        })

    raw_top.sort(key=lambda d: prio.get(d["distro"], 0xFFFF))
    raw_normal.sort(key=lambda d:d["distro"].lower()) # 忽略大小写

    raw = raw_top + raw_normal # 合并两处排序结果
    return json.dumps(raw, indent=2)


def getImageList():
    ini = ConfigParser()
    if not(ini.read(CONFIG_FILE, encoding='utf8')):
        raise Exception("%s not found!" % CONFIG_FILE)
    
    prior = {}
    for (name, value) in ini.items("%main%"):
        if re.match("d\d+$", name):
            prior[value] = int(name[1:])


    img_dict = collections.defaultdict(list)

    root = ini.get("%main%", 'root')
    urlbase = ini.get("%main%", 'urlbase')

    if not args.Remote:

        if args.dir:
            # Allow to override root in command-line
            root = args.dir
            
        oldcwd = os.getcwd()
        os.chdir(root)

    for section in ini.sections():
        if section == "%main%":
            continue
        if args.Test and (not ini.get(section, 'distro') in args.Test):
            continue
        for image in parseSection(ini.items(section)):
            img_dict[image['distro']].append(image)

    url_dict = {}
    for distro, images in img_dict.items():
        images.sort(key=lambda x: x['sort_key'], reverse=True)
        logger.debug("[IMAGES] %r %r", distro, images)
        url_dict[distro] = [getDetail(image, urlbase) for image in images]

    if not args.Remote:
        os.chdir(oldcwd)
        
    return getJsonOutput(url_dict, prior)

        

def rsyncQuery(url:str, filter=None):
    '''
    Linux only rsync query for test mode.
    '''
    rsync_proc = os.popen("rsync -r --list-only --no-motd rsync://%s/%s | awk '{ $1=$2=$3=$4=\"\"; print substr($0,5); }'" % (args.Remote.rstrip("/"), url))
    rsync_result = rsync_proc.read().strip("\r").split("\n")
    logger.debug("[FNMATCH] %s", filter)
    rsync_result = fnmatch.filter(rsync_result, filter) if filter else rsync_result
    rsync_result = [url.rstrip("/") + "/" + res.lstrip("/") for res in rsync_result]
    return rsync_result

if __name__ == "__main__":
    import sys
    logging.basicConfig(stream=sys.stderr, level=logging.DEBUG if args.Debug else logging.WARNING)
    if args.Remote and not args.Test:
        raise ArgumentError(None, 'If Remote Mode is on, images must be specified in case of heavy rsync job.')


    print(getImageList())
