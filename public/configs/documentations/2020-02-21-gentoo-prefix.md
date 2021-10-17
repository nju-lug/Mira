**注意：Gentoo Prefix Portage tree 已合并进 gentoo.git。如果您是 Linux 用户，请使用 `gentoo-portage` rsync 或 git 镜像。此 repo 专为 macOS 下 prefix 用户而设。**

## [Gentoo Prefix](https://wiki.gentoo.org/wiki/Project:Prefix) macOS 的镜像配置方法如下：

### Bootstrap 镜像配置：

在运行 Bootstrap 脚本之前，可通过设置以下环境变量选择 Bootstrap 过程中使用的镜像。

```
export GENTOO_MIRRORS="http://mirror.nju.edu.cn/gentoo"
export GNU_URL="http://mirror.nju.edu.cn/gnu"
export SNAPSHOT_URL="http://mirror.nju.edu.cn/gentoo/snapshots"
```

### Gentoo Portage Prefix 镜像配置：

在 `$EPREFIX/etc/portage` 目录下创建名为 `repos.conf` 的目录，在 `$EPREFIX/etc/portage/repos.conf/gentoo.conf` 中加入如下内容：

```
[gentoo_prefix]
sync-uri = rsync://mirror.nju.edu.cn/gentoo-portage-prefix
```

### Distfiles 配置：

这部分与在 Gentoo Linux 中配置无异，在 `$EPREFIX/etc/portage/make.conf` 中加入：

```
GENTOO_MIRRORS="https://mirror.nju.edu.cn/gentoo"
```

配置好以上两项以后，执行 `emerge --sync` 或者 `eix-sync` 进行更新。
