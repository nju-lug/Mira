## Linuxbrew-bottles 镜像使用帮助

**注:该镜像是 Linuxbrew 二进制预编译包的镜像。本镜像站同时提供 Linuxbrew 的 formula 索引的镜像（即 `brew update`
时所更新内容），请参考 [Linuxbrew 镜像使用帮助](https://mirror.nju.edu.cn/help/homebrew/) 。**

### 临时替换

```bash
export HOMEBREW_BOTTLE_DOMAIN="https://mirror.nju.edu.cn/linuxbrew-bottles/bottles"
```

### 长期替换

如果你使用 bash：

```bash
test -r ~/.bash_profile && echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirror.nju.edu.cn/linuxbrew-bottles/bottles"' >> ~/.bash_profile
test -r ~/.profile && echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirror.nju.edu.cn/linuxbrew-bottles/bottles"' >> ~/.profile
export HOMEBREW_BOTTLE_DOMAIN="https://mirror.nju.edu.cn/linuxbrew-bottles/bottles"
```

如果你使用 zsh：

```zsh
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirror.nju.edu.cn/linuxbrew-bottles/bottles"' >> ~/.zprofile
export HOMEBREW_BOTTLE_DOMAIN="https://mirror.nju.edu.cn/linuxbrew-bottles/bottles"
```
