new Vue({
  el: '#app',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.addAnima()
    },
    addAnima() {
      anime({
        targets: '.item',
        rotateX: [0, 90, 0],
        loop: true,
        easing: 'linear',
        duration: 500,
        delay: anime.stagger(200)
      })
    }
  }
})
