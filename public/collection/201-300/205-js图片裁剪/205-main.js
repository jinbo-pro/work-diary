import { createShearImg } from './createShearImg.js'

new Vue({
  el: '#app',
  data() {
    return {
      range: {
        startX: 170,
        startY: 100,
        endX: 300,
        endY: 520
      },
      original: '',
      later: ''
    }
  },
  methods: {
    selectFile(e) {
      const [file] = e.target.files
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = (e) => {
        this.original = e.target.result
        createShearImg(e.target.result, this.range).then((res) => {
          this.later = res
        })
      }
    },
    cropping() {
      createShearImg(this.original, this.range).then((res) => {
        this.later = res
      })
    }
  }
})
