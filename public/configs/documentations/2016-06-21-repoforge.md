
# Repoforge (原Rpmforge) 镜像使用帮助

[Repoforge](http://repoforge.org/) 是 RHEL 系统下的软件仓库，拥有 10000 多个软件包，被认为是最安全、最稳定的一个软件仓库。目前已长期未更新，不推荐使用。

## 添加 Repoforge 仓库

1. 运行 `cat /etc/redhat-release` 获取 EL 版本号（如 EL7 等）
2. 向系统中添加 Repoforge 的 GPG 公钥：
```
rpm --import https://mirror.nju.edu.cn/repoforge/RPM-GPG-KEY.dag.txt
```
3. 运行下列命令({{release_name}}需替换为版本号，如el7)：


```
sudo cat > /etc/yum.repos.d/rpmforge.repo << EOF
[rpmforge]
name = RHEL $releasever - RPMforge.net - dag
baseurl = https://mirror.nju.edu.cn/repoforge/redhat/{{release_name}}/en/$basearch/rpmforge
mirrorlist = http://mirrorlist.repoforge.org/{{release_name}}/mirrors-rpmforge
enabled = 1
protect = 0
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag
gpgcheck = 1

[rpmforge-extras]
name = RHEL $releasever - RPMforge.net - extras
baseurl = https://mirror.nju.edu.cn/repoforge/redhat/{{release_name}}/en/$basearch/extras
mirrorlist = http://mirrorlist.repoforge.org/{{release_name}}/mirrors-rpmforge-extras
enabled = 0
protect = 0
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag
gpgcheck = 1

[rpmforge-testing]
name = RHEL $releasever - RPMforge.net - testing
baseurl = https://mirror.nju.edu.cn/repoforge/redhat/{{release_name}}/en/$basearch/testing
mirrorlist = http://mirrorlist.repoforge.org/{{release_name}}/mirrors-rpmforge-testing
enabled = 0  
protect = 0
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag
gpgcheck = 1
EOF
```

## 更新软件包缓存

```
sudo yum makecache
```
