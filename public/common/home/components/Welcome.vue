<template>
  <div v-if="!closeWelcome" id="welcome" :class="{ show: show }">
    <center>
      <span>今日：</span>
      <iframe
        scrolling="no"
        height="18"
        frameborder="0"
        allowtransparency="true"
        src="https://i.tianqi.com/index.php?c=code&id=1&icon=1&wind=0&num=1"
      >
      </iframe>
    </center>
    <div class="closebox" @click="close">关闭</div>
  </div>
</template>

<script>
import { session } from '/utils/storage.js'
import { sleep } from '/utils/time.js'
export default {
  name: 'Welcome',
  data() {
    return {
      show: false,
      closeWelcome: false
    }
  },
  created() {
    this.closeWelcome = session.get('closeWelcome')
    this.init()
  },
  methods: {
    async init() {
      if (this.closeWelcome) return
      await sleep(1200)
      this.show = true
      await sleep(15000)
      this.close()
    },
    close() {
      this.show = false
      this.$emit('close')
      session.set('closeWelcome', true)
    }
  }
}
</script>

<style lang="less">
#welcome {
  text-align: center;
  background: #ffffff;
  border: 0px solid #ffffff;
  color: #000000;
  font-size: 14px;
  opacity: 0.9;
  padding: 10px 20px;
  position: fixed;
  left: -550px;
  bottom: 24px;
  z-index: 99999;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  transition: 0.3s;
  .from-url {
    color: #3d3b4f;
    font-weight: 700;
  }
  .closebox {
    color: #20a0ff;
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
  }
  &.show {
    left: 24px;
    transition: 0.5s;
  }
}
</style>
