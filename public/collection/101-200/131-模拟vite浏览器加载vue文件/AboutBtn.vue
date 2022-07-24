<template>
  <div>
    <p>{{ count }}</p>
    <el-button @click="handel">abuot</el-button>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      count: 1
    }
  },
  created() {
    console.log('about', '-->>> about')
  },
  methods: {
    handel() {
      this.count++
    }
  }
}
</script>

<style>
.ooo {
  color: red;
}
</style>
