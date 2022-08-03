<template>
  <div>
    <p>驼峰和连字符转换</p>
    <CardContent title="驼峰" v-model="hump" @blur="humpHandel" />
    <CardContent title="连字" v-model="line" @blur="lineHandel" />
  </div>
</template>

<script>
import { humpName, toLowerLine } from '/utils/collect.js'
import CardContent from '../components/CardContent.vue'
export default {
  components: {
    CardContent
  },
  data() {
    return {
      hump: '',
      line: ''
    }
  },
  computed: {
    humpHandel() {
      console.log(678, '-->>> 678')
      this.line = toLowerLine(this.hump)
    },
    lineHandel() {
      this.hump = humpName(this.line)
    }
  }
}
</script>
