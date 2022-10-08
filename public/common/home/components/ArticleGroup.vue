<template>
  <div class="article_list_max">
    <template v-for="(item, index) in list">
      <Article v-show="item.show" :key="index" :article="item" @linkInfo="linkInfo" />
    </template>
  </div>
</template>

<script>
import Article from './Article.vue'
export default {
  name: 'ArticleGroup',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Article
  },
  created() {},
  methods: {
    // 进入详情
    linkInfo(item) {
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
    }
  }
}
</script>

<style lang="less" scoped>
.article_list_max {
  display: grid;
  /* 子元素间隔 1rem */
  grid-gap: 1rem;
  /* 子元素最小为 300px 如果父级超过 300px 则自动网格铺满 */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 16px;
}
</style>
