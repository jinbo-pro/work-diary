<template>
  <div>
    <el-tag v-for="(item, index) in list" :key="index" v-contextmenu="() => dirMenus(item)">{{ item.title }}</el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, title: '右键菜单1' },
        { id: 2, title: '右键菜单2' },
        { id: 3, title: '右键菜单-隐藏一些按钮3' }
      ]
    }
  },
  created() {},
  methods: {
    handler(tag, num) {
      console.log(tag, num)
    },
    dirMenus(tag) {
      return [
        { text: '菜单1', handler: () => this.handler(tag, '1') },
        { text: '菜单2', handler: () => this.handler(tag, '2') },
        { text: '菜单3', handler: () => this.handler(tag, '3') },
        { text: '菜单3', hide: true, handler: () => this.handler(tag, '3') }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
