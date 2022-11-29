console.log('060-组合数')

function computed(n, m) {
  if (m == 0) return 1
  let a = 1
  for (let i = n; i > n - m; i--) {
    a *= i
  }
  let b = 1
  for (let i = 1; i <= m; i++) {
    b *= i
  }
  return a / b
}

new Vue({
  el: '#app',
  data() {
    return {
      m: 0,
      n: 0
    }
  },
  computed: {
    result() {
      return this.m && this.n ? computed(this.n, this.m) : ''
    }
  }
})
