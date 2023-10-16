## 方案一：webpack 钩子函数

```js
// 追加打包信息
config.plugins.push({
  apply: (compiler) => {
    const fs = require('fs')
    const os = require('os')
    // 构建完成钩子 https://webpack.docschina.org/api/compiler-hooks/#done
    compiler.hooks.done.tap('addBuildUserInfo', () => {
      // 获取输出的文件列表
      const keys = Array.from(compiler._assetEmittingWrittenFiles.keys())
      // 获取页面文件路径
      const indexPath = keys.find((x) => x.endsWith('.html'))
      if (!indexPath) return
      // 添加系统名称和打包时间
      const home = fs.readFileSync(indexPath).toString()
      const code = `<script>console.log('build: ${os.hostname()} ${new Date().toLocaleString()}');</script>`
      fs.writeFileSync(indexPath, `${home}\n${code}`)
    })
  }
})
```

## 方案二：webpack 自带插件 BannerPlugin

```js
const os = require('os')
const { BannerPlugin } = require('webpack')
// 匹配 app.xxx.js 入口文件, 在入口文件添加输出信息
const rule = /app\.[\w]+\.js$/
// 追加打包人信息-配置参考：https://doc.codingdict.com/webpack-cn-doc/plugins/banner-plugin/
config.plugins.push(
  new BannerPlugin({
    raw: true,
    entryOnly: true,
    include: rule,
    banner: `console.log('build: ${os.hostname()} ${new Date().toLocaleString()}');`
  })
)
```
