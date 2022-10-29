<template>
  <div :class="['main_container', { hide: !opened }]">
    <div class="sidebar_max">
      <Hamburger class="hamburger_box jac" :isActive="opened" @toggleClick="toggleClick" />
      <Sidebar :opened="opened" :treeList="treeList" />
    </div>
    <router-view />
  </div>
</template>

<script>
import { routes } from './router/routes.js'
import Sidebar from './components/Sidebar/index.vue'
import Hamburger from './components/Hamburger.vue'

export default {
  components: {
    Sidebar,
    Hamburger
  },
  data() {
    return {
      opened: true,
      treeList: []
    }
  },
  created() {
    this.treeList = routes.filter((e) => e.meta)
  },
  methods: {
    toggleClick() {
      this.opened = !this.opened
    }
  }
}
</script>
<style lang="less" scoped>
.main_container {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  display: grid;
  grid-template-columns: 200px 1fr;
  &.hide {
    grid-template-columns: 64px 1fr;
    .hamburger_box {
      width: 64px;
    }
  }
  .sidebar_max {
    overflow-x: scroll;
    border-right: 1px solid #f1f1f1;
    box-shadow: -4px -2px 20px rgb(36 37 38 / 13%);
  }
}
</style>
