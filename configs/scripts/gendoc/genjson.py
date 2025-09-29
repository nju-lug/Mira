from typing import List, Dict
import os
import json
from argparse import ArgumentParser

parser = ArgumentParser(
        prog = 'Mira documentations list generator',
        description = 'Generate documentations list for Mira',
    )

parser.add_argument('-d','--dir', default=None,
        help='Specify the directory which contains documentations. Default value is `./documentations`.'
    )

args = parser.parse_args()

def get_target_path(cur_path, target_dir):
    base_path = '/'.join(cur_path.split('/')[:-2])
    target_path = os.path.join(base_path, target_dir)
    return target_path


if __name__ == '__main__':
    res: List[Dict[str, str]] = []
    if args.dir:
        target_path = args.dir
    else:
        cur_path = os.path.dirname(__file__)
        target_path = get_target_path(cur_path, 'documentations')
    
    #dealing with links.json.
    with open(os.path.join(target_path, 'links.json'),'r') as f:
        links=json.load(f)
        if 'mirrorz' in links:
            for i in links['mirrorz']:
                print(f"Add mirrorz link {i['name']}.")
                if 'link' in i:
                    res.append({"name":i['name'],"redirect":f"https://mirror.nju.edu.cn/mirrorz-help/{i['link']}/?mirror=NJU"})
                else:
                    res.append({"name":i['name'],"redirect":f"https://mirror.nju.edu.cn/mirrorz-help/{i['name']}/?mirror=NJU"})
        if 'doc' in links:
            for i in links['doc']:
                print(f"Add doc link {i['name']}.")
                res.append(i)
    #dealing with .md files.
    for file in os.listdir(target_path):
        if file[-3:] == '.md':
            path = file
            name = file[:-3].split('-')[3:]
            name = '-'.join(name)
            print(f"Add md file {name}.")
            res.append({'name': name, 'path': path, 'route': name})
    res.sort(key=lambda d: d['name'].lower())
    with open(os.path.join(target_path, 'index.json'), 'w') as f:
        json.dump(res, f, indent=4)
