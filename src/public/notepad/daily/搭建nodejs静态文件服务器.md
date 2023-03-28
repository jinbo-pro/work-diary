[toc]

文章参考：

[Node.js 静态文件服务器实战](https://www.infoq.cn/news/2011/11/tyq-nodejs-static-file-server)

## 核心代码

- server.js

```js
const fs = require('fs')
const url = require('url')
const zlib = require('zlib')
const path = require('path')
const http = require('http')

/**
 * 静态服务器功能简介
 * 1. 支持浏览器协商缓存
 * 2. 动态 mime 文件类型
 * 3. 支持文件 GZIP 响应
 * 4. 大文件分段 Range 请求
 */

const config = require('./config')
const { rangeParse } = require('./utils')
const PORT = 8000

const server = http.createServer((request, response) => {
  // 获取请求的文件路径
  const pathname = url.parse(request.url).pathname
  const realPath = path.resolve(__dirname, `./assets${pathname.slice(-1) === '/' ? '/index.html' : pathname}`)
  fs.stat(realPath, (err, stat) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.write(`${pathname} is empty`)
      response.end()
    } else {
      let ext = path.extname(realPath)
      ext = ext ? ext.slice(1) : 'unknown'
      // 1. 设置浏览器协商缓存
      if (ext.match(config.Expires.fileMatch)) {
        const expires = new Date()
        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000)
        response.setHeader('Expires', expires.toUTCString())
        response.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge)
      }
      // 获取文件的最后修改时间返回给前端-方便浏览器更新缓存
      const lastModified = stat.mtime.toUTCString()
      response.setHeader('Last-Modified', lastModified)
      // 检测浏览器是否发送了 If-Modified-Since 请求头。如果发送而且跟文件的修改时间相同的则返回 304 状态。
      if (request.headers['If-Modified-Since'] && lastModified == request.headers['If-Modified-Since']) {
        response.writeHead(304, 'Not Modified')
        response.end()
      }
      // 2. 根据 mime 映射返回对应的文件 contentType
      const contentType = config.mimeTypes[ext] || 'text/plain'

      /**返回处理 */
      var compressHandle = function (raw, statusCode, reasonPhrase) {
        var stream = raw
        var acceptEncoding = request.headers['accept-encoding'] || ''
        var matched = ext.match(config.Compress.match)
        // 3. 文件 GZIP 响应
        if (matched && acceptEncoding.match(/\bgzip\b/)) {
          response.setHeader('Content-Encoding', 'gzip')
          stream = raw.pipe(zlib.createGzip())
        } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
          response.setHeader('Content-Encoding', 'deflate')
          stream = raw.pipe(zlib.createDeflate())
        }
        response.setHeader('Content-Type', contentType)
        response.writeHead(statusCode, reasonPhrase)
        stream.pipe(response)
        stream.on('error', (err) => {
          response.writeHead(500, { 'Content-Type': 'text/plain' })
          response.end(err)
        })
      }
      // 4. 分段 Range 请求
      response.setHeader('Accept-Ranges', 'bytes') // 告诉浏览器服务器支持 range 请求
      if (request.headers['range']) {
        const range = rangeParse(request.headers['range'], stat.size)
        if (range) {
          const [start, end] = range[0]
          response.setHeader('Content-Range', 'bytes ' + start + '-' + end + '/' + stat.size)
          response.setHeader('Content-Length', end - start + 1)
          const raw = fs.createReadStream(realPath, { start, end })
          compressHandle(raw, 206, 'Partial Content')
        } else {
          response.removeHeader('Content-Length')
          response.writeHead(416, 'Request Range Not Satisfiable')
          response.end()
        }
      } else {
        const raw = fs.createReadStream(realPath)
        compressHandle(raw, 200, 'Ok')
      }
    }
  })
})

server.listen(PORT)
console.log('Server runing at port: ' + PORT + '.')
```

- config.js

```js
/**协商缓存配置 */
exports.Expires = {
  /**缓存的文件类型 */
  fileMatch: /^(gif|png|jpg|js|css)$/gi,
  /**缓存时间 */
  maxAge: 60 * 60 * 24 * 30
}
/**GZIP压缩配置 */
exports.Compress = {
  /**可压缩的文件类型 */
  match: /css|js|html/gi
}
/**文件类型映射 */
exports.mimeTypes = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml'
}
```

- utils.js

```js
/**
 * 解析 range 请求 - 参见： koa-range
 * @param {string} str
 * @param {number} size
 * @returns
 */
function rangeParse(str, size) {
  var token = str.split('=')
  if (!token || token.length != 2 || token[0] != 'bytes') {
    return null
  }
  return token[1]
    .split(',')
    .map(function (range) {
      return range.split('-').map(function (value) {
        if (value === '') {
          return size
        }
        return Number(value)
      })
    })
    .filter(function (range) {
      return !isNaN(range[0]) && !isNaN(range[1]) && range[0] <= range[1]
    })
}

module.exports = {
  rangeParse
}
```

## 静态资源文件

- assets/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="lijinbo" />
    <link rel="stylesheet" href="./main.css" />
    <title>index page</title>
    <style></style>
  </head>

  <body>
    <div class="box">index page</div>
  </body>
</html>
```

- assets/main.css

```css
body {
  background-color: #f1f1f1;
}
```
