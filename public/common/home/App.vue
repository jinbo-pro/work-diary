<template>
  <div id="home-container">
    <TopSearch @input="searchHandel" @reset="resetList" />
    <div class="type_title">常用</div>
    <ArticleGroup :list="commonRowList" @linkInfo="linkInfo" />
    <div class="type_title">所有</div>
    <ArticleGroup :list="dataList" @linkInfo="linkInfo" />
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
import { session, local } from '/utils/storage.js'
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
      dataList: [],
      commonIdList: []
    }
  },
  computed: {
    isEmpty() {
      return !this.dataList.some((e) => e.show)
    },
    commonRowList() {
      let list = this.commonIdList.filter((e) => e.count > 3).slice(0, 8)
      list.sort((a, b) => b.count - a.count)
      return list.map((e) => this.dataList.find((x) => x.id == e.id))
    }
  },
  created() {
    this.commonIdList = local.get('commonIdList') || []
  },
  mounted() {
    this.initGetData()
  },
  methods: {
    linkInfo(item) {
      this.addCommon(item.id)
      if (item.isFile == 1) {
        if (item.fileName.endsWith('.md')) {
          window.open(`/common/parseMarked/parseMarked.html?filePath=${item.filePath}`)
        } else {
          window.open(item.filePath)
        }
      } else {
        let indexHtml = item.children?.find((ce) => ce.isFile && ce.fileName.includes('index.html'))
        if (indexHtml) {
          console.info(`${location.origin}/page/${indexHtml.id}`)
          window.open(indexHtml.filePath)
        } else {
          console.info('改文件夹下没有可打开的 html')
        }
      }
    },
    addCommon(id) {
      const cur = this.commonIdList.find((e) => e.id == id)
      if (cur) {
        cur.count++
      } else {
        this.commonIdList.push({ id, count: 1 })
      }
      local.set('commonIdList', this.commonIdList)
    },
    searchHandel(e) {
      var key = e
      if (!key) {
        this.resetList()
        return
      }
      for (let item of this.dataList) {
        // 标签匹配
        let metaKey = false
        if (item.meta) {
          const mKey = key.toLocaleLowerCase()
          metaKey = item.meta.tag.toLocaleLowerCase().includes(mKey)
        }
        // 标题关键词高亮 PinyinMatch - https://www.npmjs.com/package/pinyin-match
        const indexs = PinyinMatch.match(item.fileName, key)
        if (indexs) {
          item.show = true
          const [star, end] = indexs
          const s = item.fileName.slice(star, end + 1)
          item.searchHeight = item.fileName.replace(s, (a) => `<em>${a}</em>`)
        } else if (metaKey) {
          item.show = true
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
           * collection,loading,libusedemo 文件夹 以及子集中除开 index.html 之外的 html
           * notepad 文件夹递归渲染所有文件
           */
          if (/(collection|loading|libusedemo)/.test(node.filePath)) {
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
.type_title {
  padding-left: 16px;
}
.empty_tips {
  text-align: center;
  margin: 32px auto;
}
</style>
