<template>
  <div id="jsoneditor" :style="`width:${width};height:${height}`"></div>
</template>

<script>
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
  created() {},
  mounted() {
    this.initEdit()
  },
  methods: {
    initEdit() {
      const container = document.getElementById('jsoneditor')
      this.editor = new JSONEditor(container, this.options)
    },
    async setValue(v) {
      await this.$nextTick()
      this.editor.set(v)
    },
    getValue() {
      return this.editor.get()
    }
  }
}
</script>
