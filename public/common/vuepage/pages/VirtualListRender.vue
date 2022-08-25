<template>
  <div>
    <p>虚拟列表渲染</p>
    <div class="virtual_max">
      <VirtualScroll :oneDataHeight="50" :sourceDataList="list">
        <template slot-scope="{ row }">
          <div class="item_box ac">
            <img :src="row.cover" alt="1" />
            <span>{{ row.title }}</span>
          </div>
        </template>
      </VirtualScroll>
    </div>
  </div>
</template>

<script>
import VirtualScroll from '../components/VirtualScroll.vue'
import { loadScript } from '/utils/module/loadScript.js'
await loadScript('https://lib.baomitu.com/Mock.js/1.0.0/mock-min.js')
export default {
  components: {
    VirtualScroll
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    // 模拟数据
    const res = Mock.mock({
      'list|5000': [
        {
          id: '@id()', // id
          title: '@cname()', // 名称
          cover: 'https://place.dog/50/50' // 封面
        }
      ]
    })
    this.list = res.list
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
}
</style>
