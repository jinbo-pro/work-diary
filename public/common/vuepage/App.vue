<template>
  <div :class="['main_container', { hide: !opened }]">
    <div class="sidebar_max">
      <Hamburger class="hamburger_box jac" :isActive="opened" @toggleClick="toggleClick" />
      <Sidebar :opened="opened" :treeList="treeList" />
    </div>
    <div class="app_main">
      <router-view />
    </div>
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
  display: flex;
  transition: 0.3s;
  .sidebar_max {
    width: 200px;
    padding-top: 16px;
    overflow-x: scroll;
    border-right: 1px solid #f1f1f1;
    box-shadow: -4px -2px 20px rgb(36 37 38 / 13%);
  }
  .app_main {
    width: calc(100vw - 200px);
    overflow-y: scroll;
    height: 100vh;
    padding: 24px;
    box-sizing: border-box;
  }
  &.hide {
    .sidebar_max,
    .hamburger_box {
      width: 64px;
      transition: 0.3s;
    }
  }
}
</style>
