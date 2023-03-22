<template>
  <div :class="['back_page_top', { show_box: show && showTopBtn }]" :style="`bottom: ${bottom};`" @click.stop="toTop">
    <svg class="ionicon" viewBox="0 0 512 512">
      <title>Caret Up</title>
      <path
        fill="#409eff"
        d="M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
      ></path>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'BackPageTop',
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: true
    },
    // 距离底部位置
    bottom: {
      type: String,
      default: '20%'
    },
    // 自定义返回顶部操作
    toTopHandel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTopBtn: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollFn, false)
  },
  beforeDestroy() {
    this.showTopBtn = false
    window.removeEventListener('scroll', this.onScrollFn)
  },
  // keep-alive 页面执行下面生命周期
  activated() {
    window.addEventListener('scroll', this.onScrollFn, false)
  },
  deactivated() {
    this.showTopBtn = false
    window.removeEventListener('scroll', this.onScrollFn)
  },
  methods: {
    toTop() {
      if (this.toTopHandel) {
        return this.$emit('toTop')
      }
      document.body.scrollIntoView({ behavior: 'smooth' })
    },
    onScrollFn() {
      if (this.thr) return
      this.thr = true
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let screeHeight = document.documentElement.clientHeight || document.body.clientHeight // 屏幕高
      // 超过两屏显示返回顶部按钮
      if (scrollTop > screeHeight * 2) {
        this.showTopBtn = true
      } else {
        this.showTopBtn = false
      }
      // 节流100ms
      setTimeout(() => {
        this.thr = false
      }, 100)
    }
  }
}
</script>
<style lang="less" scoped>
.back_page_top {
  position: fixed;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  right: 16px;
  z-index: 999;
  opacity: 0;
  transform: scale(0);
  transition: 0.3s;
  .ionicon {
    width: 30px;
    height: 30px;
  }
}
.show_box {
  opacity: 1;
  transform: scale(1);
  transition: 0.3s;
}
</style>
