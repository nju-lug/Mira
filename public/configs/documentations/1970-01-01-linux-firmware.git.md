## Linux 固件仓库 Git 镜像使用帮助

如需克隆 Linux 固件仓库，使用

```
git clone https://mirror.nju.edu.cn/git/linux-firmware.git
```

若要将 NJU mirror 加入已有仓库，可在已有仓库中运行

```
git remote add nju https://mirror.nju.edu.cn/git/linux-firmware.git
```

或运行

```
git remote set-url origin https://mirror.nju.edu.cn/git/linux-firmware.git
```

将默认上游设置为 NJU 镜像。
