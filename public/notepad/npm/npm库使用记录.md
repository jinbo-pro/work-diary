[toc]

# GitHub

## elevator.js

【[传送门](https://github.com/tholman/elevator.js)】
一个使得"回到顶部"的网页滚动，具有电梯效果的 JS 库。

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

## vConsole

【[传送门](https://github.com/Tencent/vConsole.git)】
移动端 debug 工具，可以在移动端页面显示 控制台信息由微信团队开发
使用示例：

- vue 框架引入

```js
// vue 框架中首先安装依赖 npm install vconsole
// 然后 在 min.js 里面引入即可
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
```

> 注意：打包时要将引入取消掉

- html 单页面引入

```html
<script src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js"></script>
<script>
  // 初始化
  var vConsole = new VConsole()
  console.log('Hello world')
</script>
```

# vue 开发常用库

## 实现拖拽排序及置顶

- SortableJS
  【[传送门](https://github.com/SortableJS/Sortable)】
- vuedraggable
  【[传送门](https://github.com/SortableJS/Vue.Draggable)】

## 文件拖动上传

- dropzone
  【[传送门](https://github.com/enyo/dropzone)】
  > 虽然 element-ui 也集成了文件拖动上传，但是单独使用还是这个库用起来方便呀

## screenfull

【[传送门](https://github.com/sindresorhus/screenfull.js)】

> 网页全屏功能，相当于按了 F11 的功能

## vue-clipboard2

【[传送门](https://github.com/Inndy/vue-clipboard2)】

## vue-aliplayer 阿里播放器

【[传送门](https://github.com/slacrey/vue-aliplayer)】

> 剪贴板插件

## better-scroll

【[传送门](https://github.com/ustbhuangyi/better-scroll/tree/master)】

> scroll 滚动插件，超级强大
> [示例](https://better-scroll.github.io/examples/#/) > [better-scroll vue 组件封装](https://zhuanlan.zhihu.com/p/27407024)

# 微信小程序常用库

## echarts 图表

- wx-echarts
  【[传送门](https://github.com/ecomfe/echarts-for-weixin)】
- wx-charts
  【[传送门](https://github.com/xiaolin3303/wx-charts)】

## canvas 海报

- wxa-plugin-canvas
  【[传送门](https://github.com/jasondu/wxa-plugin-canvas)】

## 富文本解析

- wxParse
  【[传送门](https://github.com/icindy/wxParse)】

# github 有趣收藏

## canvas 动漫小姐姐

- github
  【[传送门](https://github.com/EYHN/hexo-helper-live2d)】
- model
  【[传送门](https://github.com/xiazeyu/live2d-widget-models)】
- live2D 使用
  【[传送门](https://www.fghrsh.net/post/123.html)】

## 控制台打印空心字

- figlet
  【[传送门](https://www.npmjs.com/package/figlet)】
