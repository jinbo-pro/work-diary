[Server-Sent Events 教程 - 阮一峰](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)

## 前端

```js
var source = new EventSource('http://127.0.0.1:8844/stream')

function tips(massage, color) {
  $('#state').text(massage).css('color', color)
}

source.onopen = function (event) {
  tips('onopen 连接成功', 'green')
}

source.onerror = function (event) {
  tips('onerror sse 连接失败 请打开服务器 ./server.js', 'red')
}

source.connecttime = function (event) {
  $('#msgBox').append(`<li>connecttime ${event.data}</li>`)
}

source.onmessage = function (event) {
  $('#msgBox').append(`<li>onmessage ${event.data}</li>`)
}
```

## 服务端

```js
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
```
