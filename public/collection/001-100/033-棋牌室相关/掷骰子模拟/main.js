const d = () => ~~(Math.random() * 6) + 1

new Vue({
  el: '#app',
  data() {
    return {
      pointList: []
    }
  },
  methods: {
    getPoint() {
      this.pointList = [d(), d(), d()]
    }
  }
})
