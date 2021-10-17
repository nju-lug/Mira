## Bioconductor 镜像使用帮助

[官方网站](https://www.bioconductor.org) 

Bioconductor 镜像源配置文件之一是 `.Rprofile` (linux 下位于 `~/.Rprofile` )。

在文末添加如下语句:

```
options(BioC_mirror="https://mirror.nju.edu.cn/bioconductor")
```

打开R即可使用该 Bioconductor 镜像源安装 Bioconductor 软件包。
