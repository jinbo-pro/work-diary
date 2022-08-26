<template>
  <div class="foot_input">
    <van-row class="ac">
      <van-col span="20">
        <div :id="inputId" @keyup.enter="send" contenteditable="true" class="textarea_box"></div>
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
import { richImgWidth } from '../tools.js'

export default {
  name: 'FootField',
  components: {
    Emoji
  },
  data() {
    return {
      inputId: `d-${guid()}`,
      showEmoji: false
    }
  },
  mounted() {
    this.textInput = document.getElementById(this.inputId)
  },
  methods: {
    send() {
      const text = richImgWidth(this.textInput.innerHTML)
      this.$emit('send', text.trim().replace('<div><br></div>', ''))
      this.textInput.innerHTML = ''
    },
    selectEmoji(item) {
      // const textInput = document.getElementById(this.inputId)
      // const insert = textInput.selectionStart
      // const m = this.message
      // this.message = m.substr(0, insert) + item + m.substr(insert)
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
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
.more .van-icon {
  padding: 6px;
}
.textarea_box {
  height: 60px;
  overflow-y: scroll;
}
</style>
