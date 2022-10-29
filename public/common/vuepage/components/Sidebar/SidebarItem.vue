<template>
  <el-menu-item v-if="!item.children" @click.native.stop="handle(item)" :index="item.path">
    <i :class="icon"></i>
    <span>{{ item.meta.title }}</span>
  </el-menu-item>

  <el-submenu v-else ref="subMenu" :index="item.path" :popper-append-to-body="false">
    <div slot="title">
      <i :class="icon"></i>
      <span>{{ item.meta.title }}</span>
    </div>
    <SidebarItem v-for="child in item.children" :key="child.path" :item="child" />
  </el-submenu>
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
