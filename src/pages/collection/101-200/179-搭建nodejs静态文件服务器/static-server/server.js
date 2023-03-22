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
