import re
import json
import os
import datetime

FILE_REG = re.compile(r'(\d{4})\-(\d{2})\-(\d{2})-(.+).md')

if __name__ == '__main__':
    entries = []
    for file in os.listdir():
        if (m := FILE_REG.match(file)) != None:
            y, m, d, name = m.groups()
            date = datetime.datetime(int(y), int(m), int(d))
            entries.append({
                "name": name,
                "time": date.timestamp(),
                "content": file
            })
    with open('index.json', 'w') as f:
        json.dump(entries, f)
