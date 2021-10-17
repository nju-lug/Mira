## Arch Linux ARM 软件仓库镜像使用帮助

编辑 /etc/pacman.d/mirrorlist， 在文件的最顶端添加：

```
Server = https://mirror.nju.edu.cn/archlinuxarm/$arch/$repo
```

更新软件包缓存：

```
sudo pacman -Syy
```
