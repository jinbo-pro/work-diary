<template>
  <div>
    <div class="home_box">home</div>
    <a href="/">返回</a>
    <PageLoading :show="showLoading" />
  </div>
</template>

<script>
import PageLoading from '/components/PageLoading.vue'
export default {
  components: {
    PageLoading
  },
  data() {
    return {
      showLoading: false
    }
  },
  created() {
    this.showLoading = true
  },
  mounted() {
    setTimeout(() => {
      this.showLoading = false
    }, 300)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home_box {
  font-size: 18px;
  color: rgb(51, 175, 70);
}
</style>
