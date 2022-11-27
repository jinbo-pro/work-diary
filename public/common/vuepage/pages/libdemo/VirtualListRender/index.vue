<template>
  <div>
    <p>
      虚拟列表渲染 - 参考文章
      <a href="https://blog.csdn.net/weixin_42230222/article/details/118464395" target="_bank">
        基于vue的长列表虚拟滚动插件
      </a>
    </p>
    <p>渲染 5000 个列表</p>
    <div class="virtual_max">
      <VirtualScroll :oneDataHeight="50" :sourceDataList="list">
        <template slot-scope="{ row }">
          <div class="item_box ac">
            <div class="img_box">
              <img :src="row.cover" alt="1" />
            </div>
            <div class="content">{{ row.index }} - {{ row.title }}</div>
            <div class="slider">
              <el-slider v-model="row.count"></el-slider>
            </div>
            <div class="progress">
              <el-progress :percentage="row.count"></el-progress>
            </div>
          </div>
        </template>
      </VirtualScroll>
    </div>
  </div>
</template>

<script>
import VirtualScroll from './VirtualScroll.vue'
import { loadScript } from '/utils/module/loadScript.js'
await loadScript('https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock-min.js')
const mockRes = Mock.mock({
  'list|5000': [
    {
      id: '@guid()', // id
      'index|+1': 1,
      'count|1-99': 1,
      title: '@ctitle()', // 名称
      cover: '@image(50x50, @hex())' // 封面
    }
  ]
})
export default {
  components: {
    VirtualScroll
  },
  data() {
    return {
      list: mockRes.list
    }
  }
}
</script>

<style lang="less" scoped>
.virtual_max {
  height: 300px;
  border: 1px solid #999;
  & > div {
    height: 300px;
  }
}
.item_box {
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
  .img_box {
    width: 50px;
    overflow: hidden;
  }
  .content {
    width: 15%;
    margin: 0 12px;
    overflow: hidden;
  }
  .slider {
    margin-right: 12px;
    width: 20%;
  }
  .progress {
    width: 30%;
  }
}
</style>
