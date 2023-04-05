<template>
  <div>
    <Tinymce v-model="value" @change="richChange" />
    <hr />
    <CardContent title="html" :value="showValue" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/index.vue'
import CardContent from '@/components/CardContent.vue'
export default {
  name: 'RichText',
  components: {
    Tinymce,
    CardContent
  },
  data() {
    return {
      value: '',
      showValue: ''
    }
  },
  created() {},
  methods: {
    richChange(v) {
      this.showValue = v
    }
  }
}
</script>

<style lang="less" scoped></style>
