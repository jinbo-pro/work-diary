## 问题原因

element-ui 源码使用 node-sass 编译 scss 文件，而我们开发时直接使用的是 sass 即（dart-sass）
编译之后因为 dart-sass 的输出模式默认为 compressed，即压缩模式，所以导致 element-ui 的图标 content 转为了字符
这就导致有时候浏览器没有正确解析 css 文件时，就会出现乱码现象，

## 解决方法

1. 替换 dart-sass 安装 node-sass 用于编译 scss 文件
   问题：虽然可以解决问题，但是 node-sass 总是安装失败，而且还要客户端安装 Python，很是麻烦
2. 使用 dart-sass 1.38.0 以上版本，并且将输出模式修改为 expanded
   ```js
   module.exports = {
     css: {
       loaderOptions: {
         scss: {
           sassOptions: { outputStyle: 'expanded' } // fix: 解决 element-ui 图标 icon 偶现乱码问题
         }
       }
     }
   }
   ```
   问题：虽然问题解决了，但是 dart-sass 1.38.0 以上版本会警告 scss 中除法语句，而 element-ui 中有很多地方都在用，
   所以打包的时候会出现很多警告，强迫症直接受不了了
3. 使用 css-unicode-loader 插件（最佳方案）
   原理是将 dart-sass 压缩后的 css 代码重新进行 Unicode 编码

   ```js
   module.exports = {
     configureWebpack: (config) => {
       if (process.env.NODE_ENV === 'production') {
         // 解决修改 element-ui 主题时 icon 乱码问题
         config.module.rules
           .filter((rule) => rule.test.toString().indexOf('scss') !== -1)
           .forEach((rule) => {
             rule.oneOf.forEach((oneOfRule) => {
               oneOfRule.use.splice(oneOfRule.use.indexOf(require.resolve('sass-loader')), 0, {
                 loader: require.resolve('css-unicode-loader')
               })
             })
           })
       }
     }
   }
   ```
