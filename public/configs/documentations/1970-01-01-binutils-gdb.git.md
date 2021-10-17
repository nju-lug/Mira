## GNU Binutils 和 GDB 等项目 Git 镜像使用帮助

如需克隆 Binutils 等项目的代码，使用

```
git clone https://mirror.nju.edu.cn/git/binutils-gdb.git
```

若要将 NJU mirror 加入已有代码库，可在已有仓库中运行

```
git remote add nju https://mirror.nju.edu.cn/git/binutils-gdb.git
```

或运行

```
git remote set-url origin https://mirror.nju.edu.cn/git/binutils-gdb.git
```

将默认上游设置为 NJU 镜像
