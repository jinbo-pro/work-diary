import Tabs from '/components/Tabs.vue'

new Vue({
  el: '#app',
  components: {
    Tabs
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    for (let i = 0; i < 5; i++) {
      this.list.push({
        id: Mock.Random.uuid(),
        title: Mock.Random.ctitle(2, 5)
      })
    }
  }
})
