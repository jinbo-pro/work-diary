const ws = require('nodejs-websocket')
console.log('开始建立 websocket 连接...')

ws.createServer(function (conn) {
  conn.on('text', function (str) {
    console.log('收到的信息为:' + str)
    conn.sendText('success')
  })
  conn.on('close', function (code, reason) {
    console.log('关闭连接')
  })
  conn.on('error', function (code, reason) {
    console.log('异常关闭')
  })
}).listen(7596)
