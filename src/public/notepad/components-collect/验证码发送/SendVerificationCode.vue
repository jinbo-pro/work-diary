<template>
  <div>
    <slot :data="{ isSending, countdown, sendVerificationCode }">
      <el-button v-if="isSending || countdown > 0" loading>{{ countdown }} 秒后重试</el-button>
      <el-button v-else type="primary" @click="sendVerificationCode">发送验证码</el-button>
    </slot>
  </div>
</template>

<script>
// 缓存验证码倒计时防止刷新重复发送
const countdownEndTime = 'SendVerificationCode-endTime'

/**发送验证码 */
export default {
  name: 'SendVerificationCode',
  props: {
    // 重试发送验证码时间(秒)
    time: {
      type: Number,
      default: 30
    },
    // 防止刷新重复发送
    stopRefresh: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isSending: false,
      countdown: 0
    }
  },
  mounted() {
    const endTime = localStorage.getItem(countdownEndTime)
    if (this.stopRefresh && endTime) {
      const remainingTime = Math.max(0, new Date(Number(endTime)) - new Date())
      this.startCountdown(remainingTime)
    }
  },
  methods: {
    sendVerificationCode() {
      const cb = () => {
        // 防止重复调用
        if (this.isSending || this.countdown > 0) return

        this.isSending = true
        const ms = this.time * 1000
        const endTime = Date.now() + ms
        localStorage.setItem(countdownEndTime, endTime)
        this.startCountdown(ms)
      }
      this.$emit('sendVerificationCode', cb)
    },
    startCountdown(duration) {
      this.countdown = Math.floor(duration / 1000)
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          this.reset()
        }
      }, 1000)
    },
    reset() {
      this.isSending = false
      this.countdown = 0
      if (this.timer) {
        this.timer = null
        clearInterval(this.timer)
        localStorage.removeItem(countdownEndTime)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
