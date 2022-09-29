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
