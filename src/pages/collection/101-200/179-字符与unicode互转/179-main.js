import { randomStringUnicode } from '@/utils/easyHash.js'

new Vue({
  el: '#app',
  data() {
    return {
      text: '',
      unicodeText: '',

      rMin: 32,
      rMax: 126,
      rNum: 16,
      randomText: ''
    }
  },
  methods: {
    createRandom() {
      const s = randomStringUnicode(this.rMin, this.rMax, this.rNum)
      console.log(s)
      this.randomText = s
    },
    transformHandle(type) {
      if (type == 1) {
        this.unicodeText = this.text.charCodeAt(0)
      } else {
        this.text = String.fromCharCode(this.unicodeText)
      }
      console.log(this.text, this.unicodeText)
    }
  }
})
