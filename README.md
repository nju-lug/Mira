# Mira

> A **Refreshed** Vue3 frontend for [NJU Open Source Software Mirror](https://mirrors.nju.edu.cn/).

## How to Build the Project

Run `npm install` to install all dependencies for development.

Run `npm run build` to compile for production.

Run `npm run preview` to compile for GitHub Pages.

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
3. Add your new documentation and its route to `index.json`.
4. Create a merge/pull request to let us know.

You can preview this project on [https://iori2333.github.io/Mira](https://iori2333.github.io/Mira/).

### Report Bugs

Please go to [Issues](https://github.com/iori2333/Mira/issues) and report your environment (system,
browser version, etc.) as well as how to trigger the bug. Note that different types of bugs should be reported in
different issues.
