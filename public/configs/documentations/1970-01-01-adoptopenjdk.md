## AdoptOpenJDK 镜像使用帮助

### Windows/macOS 用户

打开 [下载页面](https://mirror.nju.edu.cn/AdoptOpenJDK/) ，选择所需的版本，下载独立安装包。

### Debian/Ubuntu 用户

首先信任 GPG 公钥:

```
wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | sudo apt-key add -
```

再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/AdoptOpenJDK.list`

```
deb http://mirror.nju.edu.cn/AdoptOpenJDK/deb buster main # Debian 10(Buster)
deb https://mirror.nju.edu.cn/AdoptOpenJDK/deb focal main # Ubuntu 20.04
```

再执行

```
sudo apt-get update
```

### CentOS/RHEL

新建 `/etc/yum.repos.d/AdoptOpenJDK.repo`，内容为

```
[AdoptOpenJDK]
name=AdoptOpenJDK
baseurl=https://mirror.nju.edu.cn/AdoptOpenJDK/rpm/centos$releasever-$basearch/
enabled=1
gpgcheck=1
gpgkey=https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public
```

再执行

```
sudo yum makecache
```
