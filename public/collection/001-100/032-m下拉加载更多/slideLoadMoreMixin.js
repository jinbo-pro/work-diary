var slideLoadMoreMixin = {
  data() {
    return {
      loadEndMixin: false,
      dataListMixin: [],
      pageListMixin: {
        page: 1,
        pageSize: 10
      }
    }
  },
  beforeCreate() {
    // 清除页面之前的高度设置
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  mounted() {
    // 监听scroll事件
    window.addEventListener('scroll', this.onScrollMixin, false)
  },
  beforeRouteLeave(to, form, next) {
    // 离开当前路由页清除scroll事件
    console.log('离开了')
    window.removeEventListener('scroll', this.onScrollMixin)
    next()
  },
  beforeDestroy() {
    // 保险起见页面清除时再次清除scroll事件
    console.log('清除了++++')
    window.removeEventListener('scroll', this.onScrollMixin)
  },
  methods: {
    // 滚动事件
    onScrollMixin() {
      let dom = document.querySelector('#slide_load_more')
      if (!dom) {
        console.log('未获取到Dom,请设置容器id `slide_load_more` ')
        return
      }
      // 文档高度
      let innerHeight = dom.clientHeight
      // 获取窗口高度
      let outerHeight = document.documentElement.clientHeight
      // 页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement。
      // 页面没有DTD，即没指定DOCTYPE时，使用document.body。
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > innerHeight - outerHeight - 100) {
        if (this.loadEndMixin) {
          console.log('加载完毕')
        } else {
          this.getListMixin()
        }
      }
    },
    // 获取列表
    getListMixin() {
      if (this.noRepeatMixin) {
        console.log(this.noRepeatMixin, '重复请求')
        return
      }
      this.noRepeatMixin = true

      this.api(this.pageListMixin.page, this.pageListMixin.pageSize).then(
        (res) => {
          this.dataListMixin = this.dataListMixin.concat(res.data)
          if (!res.data.length) {
            this.loadEndMixin = true
            console.log('没有了')
          }
          this.noRepeatMixin = false // 重复请求状态解除
          this.pageListMixin.page++
        }
      )
    },
    // 重置请求
    resetApiMixin() {
      this.dataListMixin = []
      this.loadEndMixin = false
      this.pageListMixin.page = 1
    }
  }
}

export default slideLoadMoreMixin
