import os

if __name__ == '__main__':
    for doc in filter(lambda x: x.endswith('.md'), os.listdir('.')):
        new_content = ''
        with open(doc, 'r') as f:
            content = f.readline()
            if content.startswith('#') and content.count('帮助') != 0:
                print(content)
                new_content = f.read()
        if new_content != '':
            with open(doc, 'w') as f:
                f.write(new_content.strip())
