/**创建图片 */
function getImage(b64, range) {
  return new Promise((resolve, reject) => {
    // 创建图片对象
    const image = new Image()
    image.onload = () => {
      // 创建canvas对象
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 获取原图宽高
      const height = image.height
      const width = image.width
      // 设置canvas大小与原图宽高一致
      canvas.height = height
      canvas.width = width
      // 在canvas绘制图片
      ctx.drawImage(image, 0, 0, width, height)
      // 截图：
      resolve(drawRect(ctx, range))
    }
    image.onerror = reject
    image.src = `${b64}`
  })
}
/**绘制截图矩阵 */
function drawRect(ctx, range) {
  // 截图宽度
  const w = range.endX - range.startX
  // 截图高度
  const h = range.endY - range.startY
  // 获取截图区域内容,截图区域的像素点矩阵
  const cutImage = ctx.getImageData(range.startX, range.startY, w, h)
  // 裁剪后的base64数据
  return createNewCanvas(cutImage, w, h)
}
/**创建新的空白canvas画布将矩阵渲染截图 */
function createNewCanvas(content, width, height) {
  const nCanvas = document.createElement('canvas')
  const nCtx = nCanvas.getContext('2d')
  nCanvas.width = width
  nCanvas.height = height
  // 将画布上指定矩形的像素数据，通过 putImageData() 方法将图像数据放回画布
  nCtx.putImageData(content, 0, 0)
  return nCanvas.toDataURL('image/png')
}

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
        getImage(e.target.result, this.range).then((res) => {
          this.later = res
        })
      }
    },
    cropping() {
      getImage(this.original, this.range).then((res) => {
        this.later = res
      })
    }
  }
})
