export default {
  template: '<div>{{ msg }} - {{ index }}</div>',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      msg: '我是 sync-com'
    }
  }
}
