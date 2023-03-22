new Vue({
  el: '#app',
  data() {
    return {
      hasConvertImg: false,
      convertImgDataUrl: ''
    }
  },
  created() {},

  methods: {
    // 生成二维码
    createdQrcode() {
      return new Promise((resolve, reject) => {
        QRCode.toCanvas(document.getElementById('qrcode'), location.href, function (error) {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    },
    // 生成海报
    createdPoster() {
      return new Promise((resolve, reject) => {
        // 若滚动条不在顶部则会导致截图不完整或截图空白【(oﾟvﾟ)ノ】
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        let imageWrapper = document.getElementById('imageWrapper')
        html2canvas(imageWrapper, {
          useCORS: true,
          logging: true
        }).then((canvas) => {
          let dataURL = canvas.toDataURL('image/png')
          this.convertImgDataUrl = dataURL
          resolve()
        })
      })
    },
    // 海报和二维码生成
    toImage() {
      if (this.onRe) return
      this.onRe = true
      if (this.convertImgDataUrl) {
        this.onRe = false
        this.hasConvertImg = true
        return
      }
      console.log('海报生成中...')
      this.createdQrcode()
        .then(() => {
          return this.createdPoster()
        })
        .then(() => {
          this.hasConvertImg = true
          this.onRe = false
        })
        .catch((err) => {
          console.log(err, '-->>> err')
        })
    }
  }
})
