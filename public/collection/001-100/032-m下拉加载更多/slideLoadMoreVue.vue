<template>
  <div class="container_max">
    <div class="banner_box">广告位招租(●ˇ∀ˇ●)</div>
    <div class="goods_max" id="slide_load_more">
      <div
        v-for="(item, index) in dataListMixin"
        :key="index"
        class="item_goods"
      >
        <p>{{ item.page }} --- {{ item.name }}</p>
      </div>
      <p v-if="loadEndMixin" class="load_end">==== 到底了o(*￣▽￣*)o ===</p>
    </div>
    <div v-if="loadEndMixin" class="reset_api" @click="resetApi">重新请求</div>
  </div>
</template>

<script>
import slideLoadMoreMixin from './slideLoadMoreMixin'
export default {
  name: 'slideLoadMoreMixin',
  data() {
    return {}
  },
  mixins: [slideLoadMoreMixin],
  created() {
    this.getListMixin()
  },
  methods: {
    // 重新请求
    resetApi() {
      this.resetApiMixin()
      // 重置后改变相应参数 再次请求
      // ... 改变参数操作
      this.getListMixin()
    },
    // -- ajax请求 --
    api(page, pageSize) {
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
  }
}
</script>

<style scoped>
.container_max {
  width: 375px;
}
.banner_box {
  width: 100%;
  height: 300px;
  margin: 15px 0;
  text-align: center;
  line-height: 300px;
  border-radius: 10px;
  background-color: rgb(73, 167, 44);
}
.reset_api {
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  border-radius: 10px;
  background-color: #e0d313;
}
.goods_max {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
  background-color: #999999;
}

.item_goods {
  width: 45%;
  padding: 15px;
  text-align: center;
  border-radius: 10px;
  background-color: #ffffff;
  margin-bottom: 20px;
}

.load_end {
  width: 100%;
  margin-top: 50px;
  text-align: center;
}
</style>
