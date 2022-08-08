console.log('042-WebSocket的研究')

const ws = new WebSocket('ws://localhost:7596')

ws.onopen = function (e) {
  console.log('连接服务器成功')
  ws.send('game1')
}
ws.onclose = function (e) {
  console.log('服务器关闭')
}
ws.onerror = function () {
  console.log('连接出错 请检查是否运行 app/websocket/socket.js')
}

ws.onmessage = function (e) {
  console.log(e)
}
