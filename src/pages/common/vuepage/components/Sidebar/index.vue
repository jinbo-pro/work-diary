<template>
  <el-menu
    style="border-right: none"
    :default-active="activeMenu"
    :collapse="isCollapse"
    :unique-opened="false"
    :collapse-transition="false"
    mode="vertical"
  >
    <SidebarItem v-for="route in treeList" :key="route.path" :item="route" />
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
export default {
  props: {
    opened: {
      type: Boolean,
      default: true
    },
    treeList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SidebarItem
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.opened
    }
  }
}
</script>
