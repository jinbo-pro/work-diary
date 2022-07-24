<template>
  <div>
    <div class="home_box">home</div>
    <a href="/">返回</a>
    <PageLoading :show="showLoading" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import PageLoading from '/components/PageLoading.vue'
export default {
  components: {
    PageLoading
  },
  steup() {
    const showLoading = ref(true)
    onMounted(() => {
      setTimeout(() => {
        showLoading.value = false
      }, 300)
    })
  }
}
</script>

<style lang="less" scoped>
.home_box {
  font-size: 18px;
  color: rgb(51, 175, 70);
}
</style>
