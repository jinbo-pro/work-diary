<template>
  <div class="article_box" :data-id="article.id">
    <div class="card">
      <div class="meta_box" @click="$emit('linkInfo', article)">
        <h2 class="search_height" v-show="article.searchHeight" v-html="article.searchHeight"></h2>
        <h2 v-show="!article.searchHeight" class="file_name">
          {{ article.fileName }}
        </h2>
      </div>
      <div class="tags">
        <span v-for="(item, index) in tagList" :class="`tag tag_theme_${index % 3}`" :key="index">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article: {
      type: Object,
      default: () => ({
        id: '',
        fileName: '',
        tagList: []
      })
    }
  },
  computed: {
    tagList() {
      const tagStr = this.article?.meta?.tag || ''
      return tagStr.split(',')
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  border-radius: 13px;
  background-color: #fff;
  transition: transform 0.25s, box-shadow 0.25s;
  box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);
}
.card:hover {
  transition: 0.3s;
  transform: translateY(10px);
}
.card .meta_box {
  cursor: pointer;
  padding: 8px 15px;
  background: #fff;
  border-radius: 13px;
}

.card h2 {
  font-size: 16px;
  color: #475669;
  margin: 6px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;
}
// 关键词高亮
.article_box em {
  color: #f73131;
  font-style: normal;
}
// 标签样式
.tags {
  padding: 8px 15px;
  overflow-x: scroll;
  white-space: nowrap;
}
.tags .tag {
  cursor: pointer;
  font-size: 10px;
  padding: 0 10px;
  margin-right: 4px;
  border-radius: 20px;
}
.tag_theme_0 {
  color: #837adc;
  background-color: #edebfa;
}
.tag_theme_1 {
  color: #ff8400;
  background-color: #e1f6da;
}
.tag_theme_2 {
  color: #39c408;
  background-color: #ffedd9;
}

/* 滚动条美化 */
.tags::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: transparent;
}

/* 滚动条轨道部分 */
.tags::-webkit-scrollbar-track {
  background-color: transparent;
}

/* 滚动条滑块部分 */
.tags::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-image: linear-gradient(135deg, #09f, #3c9);
}
</style>
