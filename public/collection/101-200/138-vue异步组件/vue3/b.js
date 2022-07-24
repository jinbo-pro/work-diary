export default {
  template: '<div>{{ msg }} - {{ index }}</div>',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const msg = ref('我是 vue3 sync-com')
    return {
      msg
    }
  }
}