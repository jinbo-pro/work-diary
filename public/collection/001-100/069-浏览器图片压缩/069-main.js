console.log('069-浏览器图片压缩')

/**
 * 图片压缩
 * @param {File} image 图片
 * @param {string} quality 图片压缩比 0-1,数字越小，图片压缩越小
 * @param {string} backType 需要返回的类型 blob,file
 * @returns
 */
function compressorImage(image, quality = 0.8, backType = 'file') {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality,
      success(result) {
        let file = new File([result], image.name, { type: image.type })
        if (!backType || backType == 'blob') {
          resolve(result)
        } else if (backType == 'file') {
          resolve(file)
        } else {
          resolve(file)
        }
      },
      error(err) {
        console.log('图片压缩失败---->>>>>', err)
        reject(err)
      }
    })
  })
}

new Vue({
  el: '#app',
  data() {
    return {
      size: 0,
      sizeMin: 0,

      quality: 8,
      slides: []
    }
  },
  methods: {
    selectFile(e) {
      const [file] = e.target.files
      console.log(file, '-->>> file 压缩前的图片')

      const src = URL.createObjectURL(file)
      this.size = file.size
      compressorImage(file, this.quality / 10).then((res) => {
        console.log(res, '-->>> res 压缩后的图片')
        const msrc = URL.createObjectURL(res)
        this.sizeMin = res.size
        this.slides.push({ src, msrc, w: 600, h: 400 })
      })
    }
  }
})
