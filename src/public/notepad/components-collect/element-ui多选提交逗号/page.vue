<template>
  <div>
    <SelectListMultiple v-model="selectUser" :list="list" />
  </div>
</template>

<script>
/**
 * 多选提交逗号组件
 * 使用示例
 */
import SelectListMultiple from './SelectListMultiple.vue'
export default {
  components: {
    SelectListMultiple
  },
  data() {
    return {
      list: [
        { label: '张三', value: 'jack' },
        { label: '李四', value: 'tom' }
      ],
      selectUser: 'jack,tom'
    }
  }
}
</script>
