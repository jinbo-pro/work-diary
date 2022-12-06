[toc]

有些时候需要给打包后的文件增加一下打包人的信息，于是就有了如下研究

## 使用 webpack 构建生命周期追加

输出 asset 到 output 目录之前追加一段信息

```js
configureWebpack: (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push({
      apply: (compiler) => {
        // emit 事件参考: https://webpack.docschina.org/api/compiler-hooks/#emit
        compiler.hooks.emit.tap('addBuildTime', (compilation) => {
          for (let key in compilation.assets) {
            if (/app\.[\w]+\.js$/.test(key)) {
              console.log(key)
              compilation.assets[key]._value += `\n;console.log('打包时间：${new Date().toLocaleString()}');`
            }
          }
        })
      }
    })
  }
}
```

## 使用 webpack.BannerPlugin 插件追加信息

webpack.BannerPlugin 插件是 webpack 内置的插件，可以很方便的追加版本信息

```js
const os = require('os')
const { BannerPlugin } = require('webpack')

configureWebpack: (config) => {
  if (process.env.NODE_ENV === 'production') {
    const rule = /app\.[\w]+\.js$/
    // 配置参考：https://doc.codingdict.com/webpack-cn-doc/plugins/banner-plugin/
    config.plugins.push(
      new BannerPlugin({
        raw: true,
        entryOnly: true,
        include: rule,
        banner: `console.log('build: ${os.hostname()} ${new Date().toLocaleString()}');`
      })
    )
  }
}
```
