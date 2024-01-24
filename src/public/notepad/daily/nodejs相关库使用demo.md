## robotjs

【[传送门](https://github.com/octalmage/robotjs)】
一个 Node.js 的桌面自动化脚本库，支持 Mac、Windows 和 Linux。类似按键精灵

> 留意操作文件的 URL 参数的斜杠方向
> 如果安装 robotjs 报错，以管理员身份执行 `npm install --global --production windows-build-tools`再 `npm i robotjs`

## puppeteer

虚拟浏览器，可以更好的操作网页，爬取网页内容，为网页截图

相关文档 [结合项目来谈谈 Puppeteer](https://zhuanlan.zhihu.com/p/76237595)

简单 demo 测试

```js
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({
    width: 1920,
    height: 1080
  })
  await page.goto('https://www.baidu.com/')
  await page.screenshot({
    path: './capture.png', //图片保存路径
    type: 'png',
    fullPage: true //边滚动边截图
  })

  await browser.close()
})()
```

## 控制台打印空心字

- figlet
  【[传送门](https://www.npmjs.com/package/figlet)】

## node-sass 安装失败

1. 修改淘宝镜像 `npm config set registry https://registry.npmmirror.com`
2. 修改 github 地址 `set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/`
3. 对应版本 【Node 13 node-sass 4.13+】，【Node 12 node-sass 4.12+】
4. 清除已缓存的`binding.node` 输入：`npm rebuild node-sass`
5. 安装 python2 配置 path，尝试本地编译`binding.node`[该步骤是尝试本地编译]
6. 卸载 node-sass `npm uninstall node-sass`重新安装`npm install node-sass`

【[参考链接](https://segmentfault.com/a/1190000020993365?utm_source=tag-newest)】

> 严格按照这 6 步操作后基本都能成功了(●ˇ∀ˇ●)
