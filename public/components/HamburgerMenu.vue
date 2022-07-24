<template>
  <div class="three">
    <div :class="['hamburger', { 'is-active': active }]" @click="toggle">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  </div>
</template>

<script>
/**汉堡菜单 */
export default {
  name: 'HamburgerMenu',
  data() {
    return {
      active: false
    }
  },
  created() {},
  methods: {
    toggle() {
      this.active = !this.active
      this.$emit('toggle', this.active)
    }
  }
}
</script>

<style lang="less" scoped>
.three {
  box-sizing: border-box;
  color: #ecf0f1;
  text-align: center;
  .hamburger {
    cursor: pointer;
    .line {
      width: 50px;
      height: 5px;
      background-color: #ecf0f1;
      display: block;
      margin: 8px auto;
      transition: all 0.3s ease-in-out;
    }
  }
  .is-active {
    .line:nth-child(2) {
      opacity: 0;
    }
    .line:nth-child(1) {
      transform: translateY(13px) rotate(45deg);
    }
    .line:nth-child(3) {
      transform: translateY(-13px) rotate(-45deg);
    }
  }
}
</style>
