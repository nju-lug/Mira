### 介绍
自动更新$ZSH_CUSTOM当中的git仓库

## 提醒
1. 插件更新时会导致zsh的启动速度变慢
2. oh-my-zsh为了安全会在插件启动时进行检查，解决方法
    * 去掉相关文件夹的`group`和`others`分组的写权限
    * 禁用security checker
3. 根据实际情况选择是否启用此插件

### 安装
在本地克隆仓库
```
git clone https://mirrors.nju.edu.cn/git/autoupdate-oh-my-zsh-plugins $ZSH_CUSTOM/plugins/autoupdate
```
修改~/.zshrc
```
# disable security checker
# export ZSH_DISABLE_COMPFIX="true"
plugins=(autoupdate)
# custom plugin update frequency
export UPDATE_ZSH_DAYS=7
# quite mode
ZSH_CUSTOM_AUTOUPDATE_QUIET=true
```
