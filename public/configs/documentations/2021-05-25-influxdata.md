## Influxdata 镜像帮助

本目录是 `influxdb` ， `telegraf` 等时序型数据库的相关组件的镜像软件源。

### Debian / Ubuntu 用户

首先信任来自 [influxdata](https://docs.influxdata.com/telegraf/v1.18/introduction/installation/) 的PGP公钥：

```shell
curl -s https://repos.influxdata.com/influxdb.key | sudo apt-key add -
```

将下方文本框中的内容写入 `/etc/apt/sources.list.d/influxdb.list`

|  版本 | {{os_name}} | {{release_name}} | 
| :----: | :----: | :----: |
| Debian 8   | debian |  jessie         | 
| Debian 9   | debian |  stretch        | 
| Debian 10  | debian |  buster         | 
| Ubuntu 14.04 LTS | ubuntu | trusty |
| Ubuntu 16.04 LTS | ubuntu | xenial |
| Ubuntu 18.04 LTS | ubuntu | bionic |
| Ubuntu 20.04 LTS | ubuntu | focal |

```
deb https://mirror.nju.edu.cn/influxdata/{{os_name}}/ {{release_name}} stable
```
即可安装相关软件，如：

```shell
sudo apt install influxdb
```

### Centos / Redhat 用户
以 CentOS 8 为例，
新建 `/etc/yum.repos.d/influxdb.repo`，内容为

```
[influxdb]
name = InfluxDB Repository - RHEL $releasever
baseurl=https://mirror.nju.edu.cn/influxdata/yum/el8-x86_64
enabled=1
gpgcheck=1
gpgkey = https://mirror.nju.edu.cn/influxdata/influxdb.key
```
再执行

```shell
sudo yum makecache
```

即可安装相关软件，如：

```shell
sudo yum install influxdb
```
