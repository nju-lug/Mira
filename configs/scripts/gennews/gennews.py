import json
import os
import os.path as osp
import datetime
from argparse import ArgumentParser

HEADER_START = '<!--meta'
HEADER_END = 'end--->'


def parse_args():
    parser = ArgumentParser(
        prog='Mira news list generator',
        description='Generate news list for Mira',
    )
    parser.add_argument(
        '-d',
        '--dir',
        default=None,
        help=
        'Specify the directory which contains news. Default value is current work directory.'
    )
    return parser.parse_args()


def parse_headers(content: list[str]):
    start = content.index(HEADER_START)
    end = content.index(HEADER_END)
    header = content[start + 1:end]
    if not header:
        raise ValueError('missing header')
    header_dict = {}
    for line in header:
        if ':' not in line:
            continue
        k, v = map(lambda x: x.strip(), line.split(':'))
        if k == 'time':
            v = datetime.datetime.strptime(v, "%Y.%m.%d").timestamp()
        elif k == 'tags':
            v = v.split(',')
        header_dict[k] = v
    if 'name' not in header_dict or 'time' not in header_dict:
        raise ValueError('missing name/time in header')
    return header_dict


def get_target_path(cur_path: str, target_dir: str):
    base_path = '/'.join(cur_path.split('/')[:-2])
    target_path = os.path.join(base_path, target_dir)
    return target_path


def main():
    entries = []
    args = parse_args()
    if args.dir:
        target_path = args.dir
    else:
        cur_path = os.path.dirname(__file__)
        target_path = get_target_path(cur_path, 'news')
    print('Target path:', target_path)
    save_path = os.path.join(target_path, 'index.json')
    for file in os.listdir(target_path):
        if not file.endswith(".md"):
            continue
        with open(osp.join(target_path, file), 'r', encoding="utf8") as f:
            try:
                header = parse_headers(f.read().splitlines(keepends=False))
            except ValueError as e:
                print(f"ConvertError: {file} {e}")
                continue
            entries.append({**header, "content": file})
    entries.sort(key=lambda d: d['time'], reverse=True)
    with open(save_path, 'w', encoding="utf8") as f:
        json.dump(entries, f, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    main()
