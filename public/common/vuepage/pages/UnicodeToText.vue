<template>
  <div>
    <p>UnicodeToText</p>
    <CardContent title="code" v-model="code" />
    <CardContent title="text" :value="text" />
  </div>
</template>

<script>
function reconvert(str) {
  return str
    .replace(/(\\u)(\w{1,4})/gi, function ($0) {
      return String.fromCharCode(parseInt(escape($0).replace(/(%5Cu)(\w{1,4})/g, '$2'), 16))
    })
    .replace(/(&#x)(\w{1,4});/gi, function ($0) {
      return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, '$2'), 16))
    })
    .replace(/(&#)(\d{1,6});/gi, function ($0) {
      return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, '$2')))
    })
}
import CardContent from '../components/CardContent.vue'
export default {
  components: {
    CardContent
  },
  data() {
    return {
      code: ''
    }
  },
  computed: {
    text() {
      return reconvert(this.code)
    }
  }
}
</script>
