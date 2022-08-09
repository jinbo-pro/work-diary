const { WebSocketServer } = require('ws')
const { guid } = require('../utils/tools')

const wss = new WebSocketServer({
  port: 7596
})

// 广播
function broadcast(data, isBinary) {
  wss.clients.forEach(function (client) {
    client.send(data, { binary: isBinary })
  })
}

const userMap = new Map()

// 初始化
wss.on('connection', function (ws, req) {
  const ip = req.socket.remoteAddress
  userMap.set(ws, guid())
  ws.send(`你是第 ${wss.clients.size} 位 ip: ${ip}`)
  // 发送消息
  ws.on('message', function (data, isBinary) {
    console.log(data.toString(), '-->>> message')
    broadcast(data, isBinary)
  })
  // 退出连接
  ws.on('close', function (code) {
    console.log(userMap.get(ws), '退出连接')
    userMap.delete(ws)
    console.log(userMap.size, '-->>> size');
  })
})
