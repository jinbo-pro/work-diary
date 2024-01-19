import { numberChangeDirective } from './numberChangeDirective.js'

function createNum(max) {
  return ~~(Math.random() * max)
}

Vue.directive('numberchange', numberChangeDirective)

new Vue({
  el: '#app',
  data() {
    return {
      time: 0,
      list: []
    }
  },
  created() {
    this.createList()
  },
  methods: {
    createList() {
      for (let i = 0; i < 10; i++) {
        this.list.push({ id: Math.random(), count: createNum(10000) })
      }
    },
    changeDate() {
      for (let item of this.list) {
        item.count = createNum(10000)
      }
    }
  }
})
