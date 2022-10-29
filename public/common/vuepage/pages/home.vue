<template>
  <div>
    <div class="home_box">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'home'
    }
  }
}
</script>

<style lang="less" scoped>
.home_box {
  font-size: 18px;
  color: rgb(51, 175, 70);
}
</style>
