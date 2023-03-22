<template>
  <div class="sidebar_item_box">
    <el-menu-item v-if="!item.children" @click.native.stop="handle(item)" :index="item.path">
      <i :class="icon"></i>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>

    <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <div slot="title">
        <i :class="icon"></i>
        <span>{{ item.meta.title }}</span>
      </div>
      <SidebarItem v-for="child in item.children" :key="child.path" :item="child" />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon() {
      if (this.item.meta.icon) return this.item.meta.icon
      return this.item.children ? 'el-icon-folder' : 'el-icon-document'
    }
  },
  methods: {
    handle(item) {
      if (this.$route.path == item.path) return
      this.$router.replace(item.path)
    }
  }
}
</script>

<style>
/**修复 el-submenu 内层 span 样式失效 */
.el-menu--collapse .sidebar_item_box span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
