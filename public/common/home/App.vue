<template>
  <div id="home-container">
    <TopSearch @input="searchHandel" @reset="resetList" />
    <ArticleGroup :list="dataList" />
    <div v-show="isEmpty" class="empty_tips">
      <EmptyData title="啥也没找到╰(￣ω￣ｏ)" />
    </div>
    <FloatTools />
    <BackPageTop bottom="220px" />
    <Welcome />
  </div>
</template>

<script>
import { toList } from '/utils/tree.js'
import { session } from '/utils/storage.js'
import BackPageTop from '/components/BackPageTop.vue'
import TopSearch from './components/TopSearch.vue'
import ArticleGroup from './components/ArticleGroup.vue'
import FloatTools from './components/FloatTools.vue'
import Welcome from './components/Welcome.vue'
import EmptyData from './components/EmptyData.vue'
import { vuePageList } from './vuePageList.js'
export default {
  name: 'App',
  components: {
    ArticleGroup,
    FloatTools,
    TopSearch,
    BackPageTop,
    Welcome,
    EmptyData
  },
  data() {
    return {
      dataList: []
    }
  },
  computed: {
    isEmpty() {
      return !this.dataList.some((e) => e.show)
    }
  },
  mounted() {
    this.initGetData()
  },
  methods: {
    searchHandel(e) {
      var key = e
      if (!key) {
        this.resetList()
        return
      }
      for (let item of this.dataList) {
        const mKey = key.toLocaleLowerCase()
        let metaKey = false
        if (item.meta) {
          metaKey = item.meta.tag.toLocaleLowerCase().includes(mKey)
        }
        // 关键词高亮
        const inName = item.fileName.toLocaleLowerCase().includes(mKey)
        if (metaKey || inName) {
          item.show = true
          const reg = RegExp(key, 'gi')
          item.searchHeight = item.fileName.replace(reg, (a) => `<em>${a}</em>`)
        } else {
          item.show = false
        }
      }
    },
    resetList() {
      for (let item of this.dataList) {
        item.show = true
        item.searchHeight = ''
      }
    },
    async initGetData() {
      // 初始请求
      let list = session.get('fileList')
      if (!list) {
        const response = await fetch('/api/fileDirectory/getList')
        if (!response.ok) return null
        const res = await response.json()
        list = res.data
        session.set('fileList', list)
      }
      // 添加 vuepage 映射页面
      list = list.concat(vuePageList)
      this.dataList = toList(list)
        .filter((node) => {
          // vuepage 页面
          if (node.isVuePage) return true
          // md 文件直接渲染
          if (node.fileName.endsWith('.md')) return true
          /**
           * collection,loading 文件夹 以及子集中除开 index.html 之外的 html
           * notepad 文件夹递归渲染所有文件
           */
          if (/(collection|loading)/.test(node.filePath)) {
            if (node.isFile == 0) return true
            return node.fileName.endsWith('.html') && !/index/.test(node.fileName)
          }
        })
        .map((item) => {
          return {
            ...item,
            show: true,
            searchHeight: ''
          }
        })
    }
  }
}
</script>
<style>
#home-container {
  min-height: 100vh;
  box-sizing: border-box;
  background: url(/assets/img/bl.png) no-repeat fixed bottom left, url(/assets/img/tr.png) no-repeat fixed top right,
    #f0f2f7;
}
.empty_tips {
  text-align: center;
  margin: 32px auto;
}
</style>
