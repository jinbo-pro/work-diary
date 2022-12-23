import { emojiList } from '/components/Emoji/emojiList.js'
import { copyText } from '/utils/page.js'

new Vue({
  el: '#app',
  data() {
    return {
      emojiList
    }
  },
  methods: {
    selectEmoji(item) {
      copyText(item)
      console.log('复制成功')
    }
  }
})
