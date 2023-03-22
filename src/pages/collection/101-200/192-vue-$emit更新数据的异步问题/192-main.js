const list = [...'123456']
/**
 * $emit 更新数据是异步的
 * 解决的方式
 * 1. 使用 $nextTick() 监听更新完成
 * 2. 使用一个临时变量更新，后面在使用 $emit 更新页面数据
 */

const hello = {
  template: `
        <div>
          <button @click="handel">点击1</button>
          <p><br /></p>
          <button @click="handel2">点击2</button>
          <h1>{{ msg }}</h1>
        </div>
        `,
  props: {
    msg: String
  },
  watch: {
    msg(v) {
      console.log(v, '-->>> HelloWorld watch')
    }
  },
  methods: {
    // 使用 $nextTick 等 update:msg 更新完成
    async handel() {
      for (let i of list) {
        console.log([i, this.msg], 'i, msg')
        if (!this.msg) {
          this.$emit('update:msg', i)
          // await this.$nextTick() // 不调用该方法则在循环中无法获取最新的 msg 值
        }
      }
    },
    // 使用临时变量
    async handel2() {
      let msg = ''
      for (let i of list) {
        console.log([i, msg], 'i, msg')
        if (!msg) {
          msg = i
        }
      }
      if (!this.msg) {
        this.$emit('update:msg', msg)
      }
    }
  }
}

new Vue({
  el: '#app',
  components: {
    hello
  },
  data() {
    return {
      text: ''
    }
  },
  beforeUpdate() {
    console.log(this.text, '-->>> text page beforeUpdate')
  },
  updated() {
    console.log(this.text, '-->>> text page updated')
  }
})
