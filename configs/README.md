# NJU Mirror Configs

> Configurations for [NJU Open Source Software Mirror](https://mirrors.nju.edu.cn/).

## How to Contribute

### Mirror Documentations

```
usage: Mira documentations list generator [-h] [-d DIR]

Generate documentations list for Mira

optional arguments:
  -h, --help         show this help message and exit
  -d DIR, --dir DIR  Specify the directory which contains documentations. Default value is
                     `./documentations`.
```

1. Fork this repository.
2. To change the links of mirrorz or doc.nju.edu.cn, please modify `/documentations/links.json`. This file contains links to mirrorz and nju doc. If the name and hyperlink differs, such as 'aosp' and 'AOSP', please add both __name__ and __link__ attributes.
3. To add local documentations, place your new mirror documentation by putting your `*.md` file in `/documentations/`. A sample file is
   as follows:
   > Filename: `2021-13-37-flatter.md`  
   > Content:
   > ```markdown
   > ## Flatter 镜像安装帮助
   > 
   > 阿巴阿巴
   > 
   > ### 歪比巴卜
   > 
   > ...
   > ```
4. After modifying `links.json` or adding your `*.md` file, please run `python scripts/gendoc/genjson.py` to generate a new `index.json`. Detailed usage above.
5. Create a merge/pull request to let us know.

You can preview this project on [https://iori2333.github.io/Mira](https://iori2333.github.io/Mira/).

### Mirror News
```
usage: Mira news list generator [-h] [-d DIR]

Generate news list for Mira

optional arguments:
  -h, --help         show this help message and exit
  -d DIR, --dir DIR  Specify the directory which contains news. Default value is current work directory.
```

1. Fork this repository
2. Place the `*.md` news document in `/news/`. The filename of your document must match `<yyyy>-<mm>-<dd>-<title>.md`, for example, `2021-13-37-SomeNews.md`.
3. Run `scripts/gennews/gennews.py` with news path specified such as `python gennews.py -d ../../news`. This will generate a new `index.json`.
4. Create a merge/pull request to let us know.

### Mirror Download List

```
usage: Mira download list generator [-h] [-d DIR] [-R REMOTE] [-T [TEST ...]]

Generate download list for Mira

options:
  -h, --help            show this help message and exit
  -d DIR, --dir DIR     Override root directory.
  -R REMOTE, --Remote REMOTE
                        [Remote Mode] Using rsync to get file list instead of reading from local filesystem. Need the base of
                        target site, for example, `mirror.nju.edu.cn`.
  -T [TEST ...], --Test [TEST ...]
                        Test specified `distro`s (multiple arguments input is supported) in INI. If Remote Mode is on, `distro`s   
                        must be specified to avoid heavy rsync job.
  -D, --Debug           Show log in debug level.
```

1. Fork this repository
2. Edit `genisolist.ini`, add, modify or remove items.
3. **(Linux Only)** After modification, run the scripts for a quick test: ` python genisolist.py -R <mirror-site-base> -T <items-you-want-to-test>`. `-T` supports multiple items, for example, `-T Ventoy "VS Codium"`
4. If the test is passed, create a merge/pull request to let us know.

Exmaple:
```
python genisolist.py -R mirror.nju.edu.cn -T Ventoy
```

Output:
```
[RSync] mirror.nju.edu.cn/github-release/ventoy/Ventoy/
[
  {
    "distro": "Ventoy",
    "category": "app",
    "urls": [
      {
        "name": "1.0.84 (windows, zip)",
        "url": "/Ventoy 1.0.84 release/ventoy-1.0.84-windows.zip"
      },
      {
        "name": "1.0.84 (livecd, iso)",
        "url": "/Ventoy 1.0.84 release/ventoy-1.0.84-livecd.iso"
      },
      {
        "name": "1.0.84 (linux, tar.gz)",
        "url": "/Ventoy 1.0.84 release/ventoy-1.0.84-linux.tar.gz"
      }
    ]
  }
]
```