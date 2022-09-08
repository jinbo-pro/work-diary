<template>
  <div>
    <div id="jsoneditor" :style="`width:${width};height:${height}`"></div>
  </div>
</template>

<script>
let editor
await import('https://lib.baomitu.com/jsoneditor/9.8.0/jsoneditor.min.js')
const defaultOptions = {
  mode: 'code',
  modes: ['code', 'text', 'tree', 'preview']
}
export default {
  name: 'JsonEditor',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    options: {
      type: Object,
      default: defaultOptions
    }
  },
  mounted() {
    this.initEdit()
  },
  methods: {
    initEdit() {
      const container = document.getElementById('jsoneditor')
      editor = new JSONEditor(container, this.options)
    },
    async setValue(v) {
      await this.$nextTick()
      editor.set(v)
    }
  }
}
</script>

<style>
@import url('https://lib.baomitu.com/jsoneditor/9.8.0/jsoneditor.min.css');
</style>
