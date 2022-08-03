<template>
  <div v-show="show" @click.stop="() => 0" class="right_menu_max" :style="`top: ${y}px;left: ${x}px;`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RightMenu',
  props: {
    // 位置偏移量
    addrIv: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      show: false
    }
  },
  created() {
    document.addEventListener('click', this.close)
  },
  destroyed() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    close() {
      this.show = false
    },
    open(event) {
      event.preventDefault()
      event.stopPropagation()
      const { pageX, pageY } = event
      this.x = pageX + this.addrIv
      this.y = pageY + this.addrIv
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.right_menu_max {
  min-width: 100px;
  position: fixed;
  z-index: 9999;
}
</style>
