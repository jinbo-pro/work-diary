import { scrollTo } from '/utils/module/scrollTo.js'
// 模拟数据
const res = Mock.mock({
  'list|5': [
    {
      id: '@id()', // id
      title: '@cname()', // 名称
      'content|1-20': ['@cparagraph(1, 5)'] // 内容
    }
  ]
})

new Vue({
  el: '#app',
  data() {
    return {
      isAnimation: 1,
      activeIndex: 0,
      offsetTopArr: [],
      showFixedTop: false,
      navHeight: 0,
      navList: res.list
    }
  },
  mounted() {
    // 获取导航条高度用于判断吸附条
    const navDom = document.querySelector('#nav_box')
    this.navHeight = navDom.offsetHeight
    this.$nextTick(() => {
      // 获取所有锚点元素的 offsetTop
      for (var i = 0; i < this.navList.length; i++) {
        let boxDom = document.querySelector('#title-' + i)
        this.offsetTopArr.push(boxDom.offsetTop - this.navHeight)
      }
      // 监听滚动事件
      window.addEventListener('scroll', this.scrollHandel)
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandel)
  },
  methods: {
    scrollHandel() {
      // 获取当前文档流的 scrollTop
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 点亮导航下标
      for (var i = this.offsetTopArr.length - 1; i >= 0; i--) {
        if (scrollTop >= this.offsetTopArr[i]) {
          this.activeIndex = i
          break
        }
      }
    },
    // 选中导航
    selectItem(index) {
      this.switchBtn(index)
      this.activeIndex = index
    },
    // 点击联动
    switchBtn(index) {
      // 获取目标的 offsetTop 加1是更好的选中导航位置
      var targetOffsetTop = this.offsetTopArr[index] + 1
      // 是否动画 滚动
      if (this.isAnimation == 1) {
        scrollTo(targetOffsetTop, 500, () => {
          console.log(index)
        })
      } else {
        document.body.scrollTop = targetOffsetTop
        document.documentElement.scrollTop = targetOffsetTop
      }
    }
  }
})
