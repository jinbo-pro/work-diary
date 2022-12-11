const eventBus = new Vue()

const usercom = {
  template: `
  <div>
    <p>当前组件数据：{{ title }} - 公共数据：{{ publicTitle }}</p>
    <button @click="removeEvent">移除订阅</button>
    <button @click="addEvent">添加订阅</button>
    <button @click="send">发布</button>
  </div>
  `,
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      publicTitle: ''
    }
  },
  mounted() {
    this.addEvent()
  },
  methods: {
    send() {
      // 发布
      eventBus.$emit('change-title', this.title)
    },
    addEvent() {
      // 订阅
      eventBus.$on('change-title', this.eventChcange)
    },
    removeEvent() {
      // 不传回调函数则会移除所有的监听
      eventBus.$off('change-title', this.eventChcange)
      console.log(this.title, '移除事件监听成功')
    },
    eventChcange(val) {
      this.publicTitle = val
    }
  }
}

new Vue({
  el: '#app',
  components: {
    usercom
  },
  data() {
    return {
      text: ''
    }
  },
  mounted() {
    eventBus.$on('change-title', (val) => {
      this.text = val
    })
  },
  methods: {
    handle() {
      // 发布
      eventBus.$emit('change-title', this.text)
    },
    clearEvent() {
      eventBus.$off('change-title')
    }
  }
})
