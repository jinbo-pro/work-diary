<template>
  <div>
    <MessageGroup :list="messageList" :userInfo="userInfo" />
    <FootField @send="send" />
    <SubmitPrompt :show.sync="setNameDialog" @confirm="setName" />
  </div>
</template>

<script>
import MessageGroup from './components/MessageGroup.vue'
import FootField from './components/FootField.vue'
import SubmitPrompt from './components/SubmitPrompt.vue'
import { parseObj, tips } from './tools.js'
import { guid } from '@/utils/easyHash.js'
import { local } from '@/utils/storage.js'
const { Dialog } = vant

export default {
  components: {
    MessageGroup,
    FootField,
    SubmitPrompt
  },
  data() {
    this.ws = null
    return {
      setNameDialog: false,
      userInfo: {
        id: '',
        userName: '',
        userHeadImg: ''
      },
      messageList: []
    }
  },
  mounted() {
    const userInfo = local.get('chatRoomUserInfo')
    if (userInfo) {
      this.userInfo = userInfo
      this.initWebSocket()
    } else {
      this.setNameDialog = true
    }
  },
  methods: {
    initWebSocket() {
      const ws = new WebSocket(`ws://${location.hostname}:7596`)
      ws.onopen = (e) => {
        tips('连接服务器成功')
        this.send('init', 'join')
      }
      ws.onclose = (e) => {
        Dialog.alert({ message: '服务器已断开连接' })
      }
      ws.onerror = () => {
        Dialog.alert({
          message: '连接出错 请检查 websockt 服务器是否运行',
          confirmButtonText: '重试'
        }).then(() => {
          location.reload()
        })
      }
      ws.onmessage = (e) => {
        const data = parseObj(e.data)
        if (!data) return
        this.messageList.push(data)
      }
      this.ws = ws
    },
    send(data, type = 'message') {
      if (!this.ws) {
        this.setNameDialog = true
        return
      }
      if (!data) {
        return tips('内容不能为空')
      }
      this.ws.send(JSON.stringify({ data, type, userInfo: this.userInfo }))
    },
    setName(e) {
      this.userInfo = {
        ...e,
        id: guid()
      }
      local.set('chatRoomUserInfo', this.userInfo)
      this.initWebSocket()
    }
  }
}
</script>
