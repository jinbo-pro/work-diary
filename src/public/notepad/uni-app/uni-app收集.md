[toc]

# uni-app 收集

## app 获取 mac 地址

```js
const net = plus.android.importClass('java.net.NetworkInterface')
const wl0 = net.getByName('wlan0')
const macByte = wl0.getHardwareAddress()
const list = macByte.map((e) => (e < 0 ? 256 + e : e))
const str = list.map((n) => n.toString(16)).join('-')
console.log('mac', str)
```

# uni-app 编译到 微信小程序 的问题

## 背景图片不支持本地图片

[详细参考](https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#背景图片)
解决方案

1. 将图片放到服务器使用在线链接
2. 将图片转为 base64

- 编写一个自动化转化脚本如下

```js
const fs = require('fs')
const path = require('path')
const src = path.resolve(__dirname, './bgImg')
const dist = path.resolve(__dirname, '../../src/styles/base64-img-var.scss')

function formatSize(size) {
  return (size / 1024).toFixed(2) + 'kb'
}
function readDir(dir) {
  const fileList = fs.readdirSync(dir)
  return fileList.reduce((p, c) => {
    const filePath = path.join(dir, c)
    let item = ''
    const fileState = fs.statSync(filePath)
    if (fileState.isFile()) {
      const buf = fs.readFileSync(filePath)
      const base64 = Buffer.from(buf).toString('base64')
      const name = filePath.replace(src, '').replace(/\\/g, '/')
      console.log(name)
      if (fileState.size > 100 * 1024) {
        console.warn('图片超过 100kb 建议压缩')
      }
      item = `
      // ${name} [${formatSize(fileState.size)} -> ${formatSize(base64.length)}]
      $${c.replace(/\./g, '-')}: url(data:image/jpeg;base64,${base64});\n`
    } else {
      item = readDir(filePath)
    }
    p += item
    return p
  }, '')
}

/**
 * 背景图片自动转base64
 * 启动项目 vue.config.js 自动调用
 * 解决问题：小程序不支持在 css 中使用本地文件，包括本地的背景图和字体文件
 * 参见：https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#背景图片
 */
function imgToBase64() {
  const result = readDir(src)
  fs.writeFileSync(dist, result)
  console.log('ok')
}

module.exports = imgToBase64
```

- 然后放到 vue.config.js 里面执行即可

```js
const imgToBase64 = require('./imgToBase64/index')
module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.beforeRun.tap('runtimeScript', (compilation) => {
            imgToBase64()
          })
        }
      })
    }
  }
}
```

## 不支持 v-bind="$attrs" 语法

解决方法：需要那些属性只能一个个定义

## 绑定 style 属性不支持 es6 字符串解析

不支持以下语法
:style="`color: ${item.color}`"
应修改为如下格式
:style="'color:' + item.color"

## 全局引入组件的问题

如下语法只有 h5 支持，微信小程序需要单独引入或者使用 easycom 方式引入

```js
/** 底部按钮 */
import FootBtn from '@/src/components/FootBtn.vue'
Vue.component('FootBtn', FootBtn)

// 想要全局引入组件推荐使用 easycom
// https://uniapp.dcloud.net.cn/collocation/pages.html#easycom
```

# 更多开发记录

## 页面分享功能

生命周期函数 onShareAppMessage 实现

```js
/**页面分享 */
onShareAppMessage() {
  return {
    title: '三类人员考试报名',
    imageUrl: '/static/login/login_bg.png',
    path: '/src/pages/home/home?openId=1'
  }
}
```

## 下拉刷新

1. pages.json 配置 enablePullDownRefresh 属性为 true

```json
{
  "path": "src/pages/home/home",
  "style": {
    "navigationBarTitleText": "首页",
    "enablePullDownRefresh": true
  }
}
```

2. 页面 onPullDownRefresh 生命周期配置刷新逻辑，注意调用 uni.stopPullDownRefresh() 及时关闭刷新动画哦

```js
 /**下拉刷新 */
onPullDownRefresh() {
  console.log(678, '-->>> 678')
  this.getInitData().finally(() => uni.stopPullDownRefresh())
}
```
