```js
module.exports = defineConfig({
  // ...
  css: {
    loaderOptions: {
      sass: {
        // scss 变量全局引入
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  }
})
```

> 此方式会给每个 scss 模块都添加一段变量代码，注意变量文件的大小
