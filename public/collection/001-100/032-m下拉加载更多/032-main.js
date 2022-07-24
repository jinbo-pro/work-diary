// 请求
function api(page, pageSize) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var list = []
      for (var i = 0; i < pageSize; i++) {
        list.push({
          page: page,
          name: 'test' + i
        })
      }
      var num = Math.random()
      // 加载完
      if (num < 0.2 && page > 2) {
        list = []
      }
      var result = {
        code: 0,
        currentPage: page,
        data: list
      }
      resolve(result)
    }, 500)
  })
}
new Vue({
  el: '#app',
  data() {
    return {
      loadEnd: false,
      dataList: [],
      pageList: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // 监听scroll事件
    window.addEventListener('scroll', this.onScroll, false)
  },
  methods: {
    //滚动触底加载
    onScroll() {
      let dom = document.querySelector('#goods')
      if (!dom) return
      let innerHeight = dom.clientHeight
      // 获取窗口高度
      let outerHeight = document.documentElement.clientHeight
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > innerHeight - outerHeight - 100) {
        if (this.loadEnd) {
          console.log('加载完毕')
        } else {
          this.getList()
        }
      }
    },
    // 获取列表
    getList() {
      if (this.noRepeat) {
        console.log(this.noRepeat, '重复请求')
        return
      }
      this.noRepeat = true

      api(this.pageList.page, this.pageList.pageSize).then((res) => {
        this.dataList = this.dataList.concat(res.data)
        if (!res.data.length) {
          this.loadEnd = true
          console.log('没有了')
        }
        this.noRepeat = false // 重复请求状态解除
        this.pageList.page++
      })
    },
    // 重置请求
    resetApi() {
      this.dataList = []
      this.loadEnd = false
      this.pageList.page = 1
      this.getList()
    }
  }
})
