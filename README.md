# NJU Mirror Frontend

> A **Refreshed** Vue3 frontend for [NJU Open Source Software Mirror](https://mirrors.nju.edu.cn/).

## How to Build the Project

Run `npm install` to install all dependencies for development.

Run `npm run build` to compile for production.

Run `npm run prebuild` to compile for GitHub Pages.

Run `npm run serve` to start the development server.

## How to Contribute

### Mirror Documentations

1. Fork this repository.
2. Place your new mirror documentation by putting your `*.md` file in `public/configs/documentations/`. A sample file is
   as follows:
   > Filename: `2021-13-37-flatter.md`  
   > Content:
   > ```markdown
   > ## Flatter 镜像安装帮助
   > 
   > 阿巴阿巴
   > 
   > ### 歪比巴卜
   > 
   > ...
   > ```
3. Run `public/configs/scripts/gendoc/genjson.py`, this should generate a new `index.json`. Replace old `index.json`
   with it.
4. Create a merge/pull request to let us know.

### Report Bugs

Please go to [Issues](https://git.nju.edu.cn/iori2333/NJU-Mirror-Frontend/-/issues) and report your environment (system,
browser version, etc.) as well as how to trigger the bug. Note that different types of bugs should be reported in
different issues.
