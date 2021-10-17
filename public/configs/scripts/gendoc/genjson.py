from typing import List, Dict
import os
import json

if __name__ == '__main__':
    res: List[Dict[str, str]] = []
    for file in os.listdir('.'):
        if file[-3:] == '.md':
            path = file
            name = file[:-3].split('-')[3:]
            name = '-'.join(name)
            res.append({'name': name, 'path': path, 'route': name})
    with open('index.json', 'w') as f:
        json.dump(res, f)
