const http = require('http')
const JRouter = require('./router')
const server = http.createServer()
const { responseHandle, readFile } = require('./utils')

const jRoute = new JRouter()

jRoute.get('/api/list', (req, res) => {
  return [
    { name: 'tom', age: 1 },
    { name: 'jack', age: 2 }
  ]
})

jRoute.post('/getUserInfo', (req, res, postBody) => {
  return {
    data: 'tom',
    info: postBody
  }
})

server.on('request', async (req, res) => {
  console.log(req.url, '-->>> 678')
  // 首页
  if (req.url == '/') {
    responseHandle(res, 'text/html', readFile('index.html'))
    return
  }
  jRoute.run(req, res)
})

const port = 9778
server.listen(port, () => console.log(`- Local:     http://localhost:${port}`))
