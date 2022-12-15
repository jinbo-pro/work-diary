function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}

const imageDataList = []

new Vue({
  el: '#app',
  data() {
    return {
      imgWidth: 0,
      imgHeight: 0
    }
  },
  created() {},
  methods: {
    async selectFile(e) {
      const files = Array.from(e.target.files)
      for (let file of files) {
        const url = URL.createObjectURL(file)
        const img = await loadImg(url)
        const canvasDom = document.createElement('canvas')
        const ctx = canvasDom.getContext('2d')
        const { width, height } = img
        canvasDom.width = width
        canvasDom.height = height
        ctx.drawImage(img, 0, 0)
        const originalData = ctx.getImageData(0, 0, width, height)
        imageDataList.push(originalData)
      }
    },
    imgComparison() {
      const result = []
      if (imageDataList.length < 2) {
        console.log('请上传两张图片')
        return
      }
      const [a, b] = imageDataList
      for (let i = 0; i < a.data.length; i++) {
        const orgItem = a.data[i]
        const curItem = b.data[i]
        if (orgItem !== curItem) {
          result.push({ i, orgItem, curItem })
        }
      }
      if (result.length) {
        console.log(result, '不同的像素点')
        this.processData(a, result)
      } else {
        console.log('图片是一致的 ^_^')
      }
    },
    processData(originalData, result) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = originalData.width
      canvas.height = originalData.height
      const data = originalData.data
      for (let i = 0; i < data.length; i++) {
        // 不同的像素点涂白色
        if (result.some((e) => e.i == i)) {
          data[i] = 255
        }
      }

      // 将结果绘制到画布
      ctx.putImageData(originalData, 0, 0)
      document.body.append(canvas)
    }
  }
})
