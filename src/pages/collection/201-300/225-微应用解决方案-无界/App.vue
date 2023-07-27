<template>
  <div>
    <p>主应用</p>
    <button @click="commonHandle">主页面发布公共事件</button>
    <p>子页面提交的数据：{{ subPageData }}</p>
    <hr />
    <ul>
      <li v-for="(item, index) in pageList" :key="item.url">
        <p>应用 {{ index + 1 }}</p>
        <div :id="item.name" class="app_container"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subPageData: '',
      pageList: [
        { name: 'a', url: '/pages/common/research/wujie-children/w-1.html' },
        { name: 'b', url: '/pages/common/research/wujie-children/w-2.html' },
        { name: 'c', url: '/pages/common/vuepage/vuepage.html' }
      ]
    }
  },
  mounted() {
    for (let item of this.pageList) {
      /**
       * 配置参考
       * https://wujie-micro.github.io/doc/api/setupApp.html
       */
      wujie.setupApp({
        el: `#${item.name}`,
        name: item.name,
        url: item.url,
        props: item,
        beforeLoad: () => {
          this.beforeLoad(item)
        }
      })
      wujie.startApp({ name: item.name })
    }

    // 监听子页面的事件
    wujie.bus.$on('setPublicData', (e) => {
      this.subPageData = e.data
    })
  },
  methods: {
    beforeLoad(item) {
      console.log(`加载子应用： ${item.name}`)
    },
    commonHandle() {
      wujie.bus.$emit('commonHandle', {
        page: 0,
        data: this.pageList
      })
    }
  }
}
</script>

<style scoped>
.app_container {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #f1f1f1;
  margin-bottom: 16px;
}
</style>
