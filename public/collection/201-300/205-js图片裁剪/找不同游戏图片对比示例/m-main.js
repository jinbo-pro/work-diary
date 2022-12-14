Vue.use(window['vue-cropper'])
new Vue({
  el: '#app',
  data() {
    return {
      showRatio: true,
      cropImgList: [],
      original: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
    }
  },
  methods: {
    selectFile(e) {
      const [file] = e.target.files
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = (e) => {
        this.original = e.target.result
      }
    },
    finish() {
      this.$refs.cropper.getCropData((data) => {
        this.cropImgList.push(data)
      })
    }
  }
})
