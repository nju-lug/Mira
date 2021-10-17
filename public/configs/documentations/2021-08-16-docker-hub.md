## Docker Hub 源使用帮助

### Linux

在配置文件 `/etc/docker/daemon.json` 中加入：
```
    {
      "registry-mirrors": ["https://docker.nju.edu.cn/"]
    }
```
重新启动dockerd：
```
    sudo service docker restart
```
### macOS

1. 打开 \"Docker.app\"
2. 进入偏好设置页面(快捷键 `⌘,` )
3. 打开 \"Advanced\" 选项卡
4. 在 \"Registry mirrors\" 中添加 `https://docker.nju.edu.cn/`
5. 点击下方的 \"Restart\" 按钮

### Docker Desktop

各平台都一样：

1. 打开**Settings-Docker Engine**
2. 在`registry-mirrors`中添加`https://docker.nju.edu.cn/`
3. 点击**Apply&Restart**
