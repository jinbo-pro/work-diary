<template>
  <div id="home-container">
    <TopSearch @input="searchHandel" @reset="resetList" />
    <div class="type_title">常用</div>
    <ArticleGroup :list="commonRowList" @linkInfo="linkInfo" />
    <div v-for="(item, index) in dataList" :key="index">
      <div class="type_title">{{ item.title }}</div>
      <ArticleGroup :list="item.list" @linkInfo="linkInfo" />
    </div>
    <div v-show="isEmpty" class="empty_tips">
      <EmptyData title="啥也没找到╰(￣ω￣ｏ)" />
    </div>
    <FloatTools />
    <BackPageTop bottom="220px" />
    <Welcome />
  </div>
</template>

<script>
import { request } from '@/utils/module/request.js'
import { session, local } from '@/utils/storage.js'
import BackPageTop from '@/components/BackPageTop.vue'
import TopSearch from './components/TopSearch.vue'
import ArticleGroup from './components/ArticleGroup.vue'
import FloatTools from './components/FloatTools.vue'
import Welcome from './components/Welcome.vue'
import EmptyData from './components/EmptyData.vue'

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
      allDataList: [],
      allResCompleteList: [],
      commonIdList: []
    }
  },
  computed: {
    isEmpty() {
      return !this.allDataList.some((e) => e.show)
    },
    commonRowList() {
      if (!this.commonIdList.length || !this.allDataList.length) return []
      let list = this.commonIdList.filter((e) => e.count > 3).slice(0, 8)
      list.sort((a, b) => b.count - a.count)
      let result = []
      for (let e of list) {
        const cur = this.allDataList.find((x) => x.id == e.id)
        if (cur) {
          result.push(cur)
        }
      }
      return result
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
          window.open(`/pages/common/parseMarked/parseMarked.html?filePath=${item.filePath}`)
        } else {
          window.open(item.filePath)
        }
      } else {
        const cur = this.allResCompleteList.find((p) => p.pid == item.id && p.fileName.endsWith('index.html'))
        if (cur) {
          window.open(cur.filePath)
        } else {
          console.info('文件夹下没有可打开的 html')
        }
      }
    },
    // 添加常用id
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

      for (let item of this.allDataList) {
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
      for (let item of this.allDataList) {
        item.show = true
        item.searchHeight = ''
      }
    },
    // 初始请求
    initGetData() {
      const addDataItem = async (sort, dir, filterFn) => {
        const k = 'page_cache_' + dir
        let allList = session.get(k)
        if (!allList) {
          allList = await request.get('/api/fileDirectory/getList', { dir })
          session.set(k, allList)
        }
        const list = allList.filter(filterFn).map((node) => {
          return {
            ...node,
            show: true,
            searchHeight: '',
            filePath: `/${dir}${node.filePath}`
          }
        })
        this.dataList.push({ sort, title: dir, allList, list })
        this.dataList.sort((a, b) => a.sort - b.sort)
        this.allDataList.push(...list)
        for (let node of allList) {
          node.filePath = `/${dir}${node.filePath}`
          this.allResCompleteList.push(node)
        }
      }
      addDataItem(1, 'pages/collection', (e) => e.isFile == 0 || !e.fileName.endsWith('index.html'))
      addDataItem(2, 'notepad', (e) => e.isFile)
      addDataItem(3, 'loading', (e) => !e.isFile)
    }
  }
}
</script>

<style scoped>
#home-container {
  min-height: 100vh;
  box-sizing: border-box;
  background: url(@/assets/img/bl.png) no-repeat fixed bottom left, url(@/assets/img/tr.png) no-repeat fixed top right,
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
