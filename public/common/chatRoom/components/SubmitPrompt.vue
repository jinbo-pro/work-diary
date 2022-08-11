<template>
  <van-popup v-model="showPopup" style="width: 90%" @close="close">
    <div class="mask_max fdc jsb" @click.stop>
      <van-field v-model="content" rows="4" autosize type="textarea" :border="false" :placeholder="placeholder" />
      <div class="jsb">
        <van-button @click="close">关闭</van-button>
        <van-button color="#4285F4" @click="confirm">确认</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { tips } from '../tools.js'
export default {
  name: 'SubmitPrompt',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 提示信息
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    showPopup: {
      get() {
        return this.show
      },
      set(v) {
        this.$emit('update:show', v)
      }
    }
  },
  created() {},
  methods: {
    close() {
      this.content = ''
      this.showPopup = false
    },
    confirm() {
      if (!this.content) return tips(this.placeholder)
      this.$emit('confirm', this.content)
      this.close()
    }
  }
}
</script>

<style lang="less" scoped>
.mask_max {
  padding: 24px;
}
</style>
