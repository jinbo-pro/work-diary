const http = require('http')

const app = http.createServer(function (req, res) {
  if (req.url === '/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    })
    const msg = () => new Date().toLocaleString()

    res.write('retry: 10000\n')
    res.write('event: connecttime\n')
    res.write('data: ' + msg() + '\n\n')
    res.write('data: ' + msg() + '\n\n')

    let index = 1
    let interval = setInterval(function () {
      res.write(`data: ${msg()} - ${index++} \n\n`)
    }, 1000)

    req.connection.addListener(
      'close',
      function () {
        clearInterval(interval)
      },
      false
    )
  }
})

app.listen(8844, '127.0.0.1')

console.log('sse 推送服务器启动成功地址: http://127.0.0.1:8844/stream')
