import { guid } from '@/utils/easyHash.js'
import { parseTime } from '@/utils/time.js'

new Vue({
  el: '#app',
  data() {
    return {
      createId: guid(),
      messageList: []
    }
  },
  created() {
    this.card = new BroadcastChannel('card')
    this.card.onmessage = (e) => {
      this.messageList.push(e.data)
    }
  },
  methods: {
    send() {
      this.card.postMessage({
        createId: this.createId,
        time: parseTime(new Date()),
        content: Math.random()
      })
      console.log('发送成功')
    }
  }
})
