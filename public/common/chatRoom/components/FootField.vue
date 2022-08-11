<template>
  <div class="foot_input">
    <van-row class="ac">
      <van-col span="20">
        <van-field
          :id="inputId"
          class="textarea_box"
          v-model.trim="message"
          rows="2"
          type="textarea"
          maxlength="500"
          placeholder="请输入内容"
          show-word-limit
          @keyup.enter="send"
        ></van-field>
      </van-col>
      <van-col span="4" class="fdc ac more">
        <van-icon name="smile-o" size="35" @click="toggleEmojiDialog" />
        <van-icon name="add-o" size="35" color="#999" />
      </van-col>
    </van-row>
    <Emoji :show="showEmoji" @select="selectEmoji" />
  </div>
</template>

<script>
import Emoji from './Emoji/index.vue'
import { guid } from '/utils/easyHash.js'

export default {
  name: 'FootField',
  components: {
    Emoji
  },
  data() {
    return {
      inputId: `d-${guid()}`,
      message: '',
      showEmoji: false
    }
  },
  methods: {
    send() {
      this.$emit('send', this.message)
      this.message = ''
    },
    selectEmoji(item) {
      const textInput = document.getElementById(this.inputId)
      const insert = textInput.selectionStart
      const m = this.message
      this.message = m.substr(0, insert) + item + m.substr(insert)
    },
    toggleEmojiDialog() {
      this.showEmoji = !this.showEmoji
      if (this.showEmoji) {
        this.$nextTick(() => {
          document.getElementById(this.inputId).focus()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.foot_input {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
.more .van-icon {
  padding: 6px;
}
</style>
