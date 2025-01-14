const { WebSocketServer } = require('ws')

const port = 7596

const wss = new WebSocketServer({ port })
console.log(`websockt 服务器启动 port: ${port}`)

// 广播
function broadcast(data, isBinary) {
  wss.clients.forEach(function (client) {
    client.send(data, { binary: isBinary })
  })
}

function parseObj(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}

const userMap = new Map()

// 初始化
wss.on('connection', function (ws, req) {
  const ip = req.socket.remoteAddress
  userMap.set(ws, Date.now() + Math.random())
  console.log(userMap.size, '-->>> size')
  ws.send(`你是第 ${wss.clients.size} 位 ip: ${ip}`)
  // 发送消息
  ws.on('message', function (data, isBinary) {
    const obj = parseObj(data.toString())
    if (!obj) return
    broadcast(data, isBinary)
  })
  // 退出连接
  ws.on('close', function (code) {
    console.log(userMap.get(ws), '退出连接')
    userMap.delete(ws)
  })
})
