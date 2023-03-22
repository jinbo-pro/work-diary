console.log('042-WebSocket的研究')

function parseObj(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}
let user = `游客-${Date.now()}`
const ws = new WebSocket(`ws://${location.hostname}:7596`)
function send(data, type) {
  ws.send(JSON.stringify({ type, data, user }))
}

const vm = new Vue({
  el: '#app',
  data() {
    return {
      user,
      message: '',
      messageList: []
    }
  },
  mounted() {
    document.getElementById('app').style.display = 'block'
  },
  methods: {
    sendMessage() {
      if (!this.message) {
        return vant.Toast.fail('内容不能为空')
      }
      send(this.message, 'message')
      this.message = ''
    }
  }
})

ws.onopen = function (e) {
  console.log('连接服务器成功')
  send(user, 'join')
}
ws.onclose = function (e) {
  console.log('服务器关闭')
}
ws.onerror = function () {
  console.log('连接出错 请检查 websockt 服务器是否运行，请启动 ./websocket/socket.js')
}

ws.onmessage = function (e) {
  console.log(e)
  const data = parseObj(e.data)
  if (!data) return
  vm.messageList.push(data)
  vm.$nextTick(() => {
    const mainDom = document.querySelector('.main')
    mainDom.scrollTop = mainDom.scrollHeight
  })
}
