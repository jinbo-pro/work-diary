<template>
  <div>
    <div class="mask" @contextmenu.prevent="removeContextmenu()" @mousedown="removeContextmenu()"></div>

    <div
      class="contextmenu"
      :style="{
        left: style.left + 'px',
        top: style.top + 'px'
      }"
      @contextmenu.prevent
    >
      <MenuContent :menus="menus" :handleClickMenuItem="handleClickMenuItem" />
    </div>
  </div>
</template>

<script>
/**
 * 自定义右键菜单
 * 源码参考: https://gitee.com/pptist/PPTist/blob/master/src/components/Contextmenu/index.vue
 * 相关文章-1：https://www.jianshu.com/p/af035ffb0f78
 * 相关文章-2：https://zhuanlan.zhihu.com/p/388902033
 */
import MenuContent from './MenuContent.vue'
export default {
  name: 'Contextmenu',
  props: {
    axis: {
      type: Object,
      required: true
    },
    el: {
      type: null,
      required: true
    },
    menus: {
      type: Array,
      required: true
    },
    removeContextmenu: {
      type: Function,
      required: true
    }
  },
  components: {
    MenuContent
  },
  computed: {
    style() {
      const MENU_WIDTH = 170
      const MENU_HEIGHT = 30
      const DIVIDER_HEIGHT = 11
      const PADDING = 5

      const { x, y } = this.axis
      const menuCount = this.menus.filter((menu) => !(menu.divider || menu.hide)).length
      const dividerCount = this.menus.filter((menu) => menu.divider).length

      const menuWidth = MENU_WIDTH
      const menuHeight = menuCount * MENU_HEIGHT + dividerCount * DIVIDER_HEIGHT + PADDING * 2

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      return {
        left: screenWidth <= x + menuWidth ? x - menuWidth : x,
        top: screenHeight <= y + menuHeight ? y - menuHeight : y
      }
    }
  },
  methods: {
    handleClickMenuItem(item) {
      if (item.disable) return
      if (item.children && !item.handler) return
      if (item.handler) item.handler(this.el)
      this.removeContextmenu()
    }
  }
}
</script>

<style lang="less">
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
}
.contextmenu {
  position: fixed;
  z-index: 9999;
  user-select: none;
}
</style>
