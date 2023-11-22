## vue-cli 5.x

### 安装依赖

package.json

```json
{
  "javascript-obfuscator": "^4.1.0",
  "webpack-obfuscator": "^3.5.1"
}
```

### 配置

vue.config.js

```js
module.exports = defineConfig({
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      /**
       * 代码混淆
       * 配置参考：https://blog.csdn.net/qq_32247819/article/details/118724267
       */
      config.plugins.push(
        new WebpackObfuscator(
          {
            compact: true, // 压缩代码
            rotateUnicodeArray: true, // 打乱Unicode数组顺序
            stringArray: true, // 删除字符串文字并将它们放在一个特殊的数组中
            selfDefending: true, // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
            identifierNamesGenerator: 'hexadecimal'
          },
          ['*/chunk-vendors*.js'] // 忽略库文件
        )
      )
    }
  }
})
```

## vue-cli 4.x

vue-cli4.x 只需注意依赖版本，配置是一样的
依赖版本如下

```json
{
  "javascript-obfuscator": "2.6.0",
  "webpack-obfuscator": "2.6.0"
}
```
