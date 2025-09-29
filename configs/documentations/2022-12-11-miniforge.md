## Miniforge 软件包说明

Miniforge 是一个带有以下预配置功能的 conda 包管理器:

> 1. conda-forge set as the default (and only) channel.
> 2. Packages in the base environment are obtained from the conda-forge channel.
> 3. Optional support for PyPy in place of standard Python interpreter (aka "CPython").
> 4. Optional support for Mamba in place of Conda.
> 5. An emphasis on supporting various CPU architectures (x86_64, ppc64le, and aarch64 including Apple M1).

如果需要使用 [Mamba](https://github.com/mamba-org/mamba) 代替 conda ，那么可以选择安装 `Mambaforge-*` 系列的包，更多安装和使用说明可以参考[官方网站](https://github.com/conda-forge/miniforge)。

安装包的下载地址在 [https://mirror.nju.edu.cn/github-release/conda-forge/miniforge/LatestRelease/](https://mirror.nju.edu.cn/github-release/conda-forge/miniforge/LatestRelease/)。

## 其他镜像配置说明

NJU Mirror 还提供了 Anaconda 仓库与第三方源（conda-forge、msys2、pytorch等，[查看完整列表](https://mirror.nju.edu.cn/anaconda/cloud/)）的镜像，各系统都可以通过修改用户目录下的 `.condarc`文件。
Windows 用户无法直接创建名为 `.condarc` 的文件，可先执行 `conda config --set show_channel_urls yes` 生成该文件之后再修改。

注：由于更新过快难以同步，我们不同步`pytorch-nightly`, `pytorch-nightly-cpu`, `ignite-nightly`这三个包。

Miniforge 建议使用的 `.condarc` 配置文件:

```
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirror.nju.edu.cn/anaconda/cloud/conda-forge/
```

运行 `conda clean -i` 清除索引缓存，保证用的是镜像站提供的索引。

运行 `conda create -n myenv numpy` 测试一下吧。

同时也可以参考我们在 [Anaconda](https://mirror.nju.edu.cn/help/anaconda) 中给出的配置说明。


