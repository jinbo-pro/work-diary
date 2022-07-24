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
