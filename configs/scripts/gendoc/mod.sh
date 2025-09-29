sed -i 's/{{ site.hostname }}/mirror.nju.edu.cn/g' *.md
sed -i 's|{{ site.url }}|https://mirror.nju.edu.cn|g' *.md
sed -i 's|{{ site.pypi }}|mirror.nju.edu.cn/web|g' *.md
