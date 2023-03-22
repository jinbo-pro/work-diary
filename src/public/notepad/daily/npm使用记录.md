## npm

- 淘宝镜像

> 单次使用 `npm install --registry=https://registry.npm.taobao.org`
> 永久使用 `npm config set registry https://registry.npm.taobao.org`
> 手动修改设置淘宝镜像地址
>
> 1.  打开.npmrc 文件（C:\Program Files\nodejs\node_modules\npm\npmrc，没有的话可以使用 git 命令行建一个( touch .npmrc)，用 cmd 命令建会报错）
> 2.  增加 registry =https://registry.npm.taobao.org 即可。

## yarn

- 安装
  `npm install -g yarn`
- 命令

npm yarn
初始化
npm init yarn init
安装一个依赖
npm install vue yarn add vue
一次性添加多个依赖
npm install vue babel yarn add vue babel
安装所有依赖
npm install yarn install
添加指定版本的包：
npm install jquery@2.1.4 yarn add jquery@2.1.4
将包更新到指定版本
npm update jquery@3.0.0 yarn upgrade jquery@3.0.0
删除包
npm uninstall vue yarn remove jquery
一次删除多个包
npm uninstall vue babel yarn remove bootstrap zepto

更多对照信息如下
npm install yarn add
npm install --no-package-lock yarn add --no-lockfile
npm install [package] --save yarn add [package]
npm install [package] --save-dev yarn add [package] --dev
npm install [package] --global yarn global add [package]
npm update --global yarn global upgrade  
npm rebuild yarn add --force
npm uninstall [package] yarn remove [package]
npm cache clean yarn cache clean [package]
rm -rf node_modules && npm install yarn upgrade  
npm version major yarn version --major  
npm version minor yarn version --minor  
npm version patch yarn version --patch

```html
<!-- npm cdn -->
<script src="https://unpkg.com/包名@版本号"></script>
<!-- 示例 -->
<script src="https://unpkg.com/vue@2.6.10"></script>
```

## NVM

- 下载 nvm【[下载地址](https://github.com/coreybutler/nvm-windows/releases)】

  nvm-noinstall.zip：绿色免安装版，但使用时需进行配置，

  nvm-setup.zip：安装版，推荐使用

- 安装

  直接按照流程走即可

- 打开 cmd 输入 nvm 即可看到帮助信息

- 安装 node 版本

  - 查看本地安装的所有版本`nvm list [available]`
  - 安装，命令中的版本号可自定义`nvm install 14.16.0`
  - 使用特定版本`nvm use 14.16.0`
  - 卸载`nvm uninstall 14.16.0`

- 命令提示

1. nvm arch ：显示 node 是运行在 32 位还是 64 位。
2. nvm install <version> [arch] ：安装 node， version 是特定版本也可以是最新稳定版本 latest。可选参数 arch 指定安装 32 位还是 64 位版本，默认是系统位数。可以添加--insecure 绕过远程服务器的 SSL。
3. nvm list [available] ：显示已安装的列表。可选参数 available，显示可安装的所有版本。list 可简化为 ls。
4. nvm on ：开启 node.js 版本管理。
5. nvm off ：关闭 node.js 版本管理。
6. nvm proxy [url] ：设置下载代理。不加可选参数 url，显示当前代理。将 url 设置为 none 则移除代理。
7. nvm node_mirror [url] ：设置 node 镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
8. nvm npm_mirror [url] ：设置 npm 镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
9. nvm uninstall <version> ：卸载指定版本 node。
10. nvm use [version] [arch] ：使用制定版本 node。可指定 32/64 位。
11. nvm root [path] ：设置存储不同版本 node 的目录。如果未设置，默认使用当前目录。
12. nvm version ：显示 nvm 版本。version 可简化为 v。
