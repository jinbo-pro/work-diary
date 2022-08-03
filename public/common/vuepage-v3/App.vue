<template>
  <div>
    {{ count }}
    <el-button type="primary">Primary</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
export default {
  name: 'vuename',
  setup() {
    onMounted(() => {
      console.log(678, '-->>> 678')
    })
    const count = ref('你好')
    const userInfo = reactive({
      name: '',
      num: 1
    })
    const getList = () => {
      count.value += 1
    }
    return {
      count,
      userInfo,
      getList
    }
  }
}
</script>
