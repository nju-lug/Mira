## Kubernetes 镜像使用帮助

Kubernetes 是用于自动部署，扩展和管理容器化应用程序的开源系统。详情可见 [官方介绍](https://kubernetes.io/zh/)。

**硬件架构: `x86_64`, `armhfp`, `aarch64`**

### Debian/Ubuntu 用户

首先导入 gpg key：

```shell
$ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```

新建 `/etc/apt/sources.list.d/kubernetes.list`，内容为

```
deb https://mirror.nju.edu.cn/kubernetes/apt kubernetes-{{release_name}} main
```

|  版本 | {{os_name}} | {{release_name}} | 
| :----: | :----: | :----: |
| Debian 8   | debian |  jessie         | 
| Debian 9   | debian |  stretch        | 
| Debian 10  | debian |  buster         | 
| Ubuntu 14.04 LTS | ubuntu | trusty |
| Ubuntu 16.04 LTS | ubuntu | xenial |
| Ubuntu 18.04 LTS | ubuntu | bionic |
| Ubuntu 20.04 LTS | ubuntu | focal |

### RHEL/CentOS 用户

以 CentOS 7 为例， 新建 `/etc/yum.repos.d/kubernetes.repo`，内容为：

```
[kubernetes]
name=kubernetes
baseurl=https://mirror.nju.edu.cn/kubernetes/yum/repos/kubernetes-el7-$basearch
enabled=1
```

### Minikube

请到 [minikube 镜像](https://mirror.nju.edu.cn/github-release/kubernetes/minikube/LatestRelease/) 下载。
