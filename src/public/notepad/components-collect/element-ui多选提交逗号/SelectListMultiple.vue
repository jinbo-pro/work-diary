<template>
  <el-select v-bind="$attrs" multiple v-model="selection" @change="change" @clear="clear">
    <el-option v-for="(item, index) in list" :key="index" :label="item[labelKey]" :value="item[valueKey]"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectListMultiple',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {}
  },
  computed: {
    selection: {
      get() {
        return this.value ? this.value.split(',') : []
      },
      set(v) {
        this.$emit('input', v.toString())
      }
    }
  },
  created() {},
  methods: {
    change(e) {
      this.$emit('change', e.toString())
    },
    clear() {
      this.$emit('clear')
    }
  }
}
</script>

<style lang="scss" scoped></style>
