<template>
  <div class="nav_max">
    <div
      v-for="(item, index) in list"
      :key="index"
      ref="nav"
      :class="['nav_item', { active: active == index }]"
      @click="setActive(index)"
    >
      <slot :item="item"></slot>
    </div>
    <div class="active_bar" :style="getActiveBarStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      active: 0,
      getActiveBarStyle: {
        width: '',
        transform: ''
      }
    }
  },
  mounted() {
    this.setActive(this.active)
  },
  methods: {
    setActive(index) {
      this.active = index
      const dom = this.$refs.nav[index]
      this.getActiveBarStyle = {
        width: dom.clientWidth + 'px',
        transform: `translateX(${dom.offsetLeft}px)`
      }
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="less" scoped>
.nav_max {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  position: relative;

  .nav_item {
    height: 30px;
    padding: 18px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 3px;
    margin-right: 16px;
    cursor: pointer;
  }
  .active {
    color: #409eff;
  }

  .active_bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #409eff;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
  }
}
</style>
