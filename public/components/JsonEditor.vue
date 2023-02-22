<template>
  <div id="jsoneditor" :style="`width:${width};height:${height}`"></div>
</template>

<script>
let editor
import { loadScript } from '/utils/module/loadScript.js'
await loadScript('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/jsoneditor/9.7.2/jsoneditor.min.js')
await loadScript('https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-y/jsoneditor/9.7.2/jsoneditor.min.css', 'link')
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
    },
    getValue() {
      return editor.get()
    }
  }
}
</script>
