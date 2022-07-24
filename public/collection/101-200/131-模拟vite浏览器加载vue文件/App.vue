<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="title">queryString</div>
        <div class="content">{{ msg }}</div>
      </el-col>
      <el-col :span="16">
        <div>
          <AboutBtn />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '我是消息'
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.msg, '-->>> msg')
    }, 100)
  }
}
</script>

<style>
.title {
  font-size: 18px;
}
.content {
  padding: 12px;
}
</style>
