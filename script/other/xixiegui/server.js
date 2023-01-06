const http = require('http')
const { getInitData, update, reset } = require('./controller')
const { parseStrToJson, response, parseBody, readFile } = require('./common')
const server = http.createServer()

server.on('request', async (req, res) => {
  const url = req.url
  console.log(url)
  if (url == '/') {
    // 首页
    response(res, 'text/html', readFile('index.html'))
  } else if (url == '/getInitData') {
    // 获取初始数据
    const list = await getInitData()
    response(res, 'application/json', list)
  } else if (url == '/update') {
    // 更新
    const dataStr = await parseBody(req)
    update(parseStrToJson(dataStr))
    response(res, 'application/json', { code: 0, message: '更新成功' })
  } else if (url == '/reset') {
    // 重置
    reset()
    response(res, 'application/json', { code: 0, message: '重置成功' })
  } else if (url.endsWith('.js')) {
    // 静态js文件
    response(res, 'application/javascript', readFile(url))
  } else if (url.endsWith('.ico')) {
    // 网页图标
    const content = readFile('favicon.ico', true)
    res.setHeader('Content-Type', 'image/x-icon')
    res.write(content, 'binary')
    res.end()
  } else {
    // 空白页
    response(res, 'text/html', '<p>404</p>')
  }
})

const port = 9500
server.listen(port, () => console.log(`- Local:     http://localhost:${port}`))
