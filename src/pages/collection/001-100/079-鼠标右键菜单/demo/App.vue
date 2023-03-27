<template>
  <div>
    <p>
      <a href="https://gitee.com/pptist/PPTist/blob/master/src/components/Contextmenu/index.vue" target="_bank">
        源码参考
      </a>
    </p>

    <ul>
      <li v-for="(item, index) in list" :key="index" v-contextmenu="() => dirMenus(item)">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, title: '右键菜单1' },
        { id: 2, title: '右键菜单2' },
        { id: 3, title: '右键菜单-隐藏一些按钮3' },
        { id: 4, title: '右键菜单' },
        { id: 5, title: '右键菜单' },
        { id: 6, title: '右键菜单' },
        { id: 7, title: '右键菜单' }
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
