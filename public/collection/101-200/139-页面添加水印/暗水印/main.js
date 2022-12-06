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
function mergeData(ctx, newData, color, originalData) {
  let oData = originalData.data
  let bit, offset // offset的作用是找到alpha通道值，这里需要大家自己动动脑筋
  switch (color) {
    case 'R':
      bit = 0
      offset = 3
      break
    case 'G':
      bit = 1
      offset = 2
      break
    case 'B':
      bit = 2
      offset = 1
      break
  }

  for (let i = 0; i < oData.length; i++) {
    if (i % 4 == bit) {
      // 只处理目标通道
      if (newData[i + offset] === 0 && oData[i] % 2 === 1) {
        // 没有信息的像素，该通道最低位置0，但不要越界
        if (oData[i] === 255) {
          oData[i]--
        } else {
          oData[i]++
        }
      } else if (newData[i + offset] !== 0 && oData[i] % 2 === 0) {
        // // 有信息的像素，该通道最低位置1，可以想想上面的斑点效果是怎么实现的
        oData[i]++
      }
    }
  }
  ctx.putImageData(originalData, 0, 0)
}
function processData(ctx, originalData) {
  let data = originalData.data
  for (let i = 0; i < data.length; i++) {
    if (i % 4 == 0) {
      // R分量
      if (data[i] % 2 == 0) {
        data[i] = 0
      } else {
        data[i] = 255
      }
    } else if (i % 4 == 3) {
      // alpha通道不做处理
      continue
    } else {
      // 关闭其他分量，不关闭也不影响答案
      data[i] = 0
    }
  }
  // 将结果绘制到画布
  ctx.putImageData(originalData, 0, 0)
}

function drawText(ctx, text, w, h) {
  ctx.font = '16px Microsoft Yahei'
  const len = text.length * 16 + 32
  const col = Math.ceil(w / len)
  const row = Math.ceil(h / 16)
  for (let x = 0; x < col; x++) {
    for (let y = 0; y < row; y++) {
      if (y % 3 == 0) {
        ctx.fillText(text, x * len, y * 16)
      }
    }
  }
}

new Vue({
  el: '#app',
  data() {
    return {
      text: '这是文案'
    }
  },
  methods: {
    selectFile(e) {
      const [file] = e.target.files
      const url = URL.createObjectURL(file)
      loadImg(url).then((img) => {
        this.encodeImg(img)
      })
    },
    /**添加水印 */
    encodeImg(img) {
      const canvasDom = document.getElementById('canvas')
      const { width, height } = img
      canvasDom.width = width
      canvasDom.height = height
      const ctx = canvasDom.getContext('2d')
      drawText(ctx, this.text, width, height)
      const textData = ctx.getImageData(0, 0, width, height).data
      ctx.drawImage(img, 0, 0)
      const originalData = ctx.getImageData(0, 0, width, height)
      mergeData(ctx, textData, 'R', originalData)
    },
    /**解析水印 */
    parseImg() {
      const ctxImg = document.getElementById('canvas')
      const imgUrl = ctxImg.toDataURL('image/png')
      const canvasDom = document.getElementById('canvas-parse')
      const ctx = canvasDom.getContext('2d')
      loadImg(imgUrl).then((img) => {
        canvasDom.width = img.width
        canvasDom.height = img.height
        ctx.drawImage(img, 0, 0)
        const originalData = ctx.getImageData(0, 0, img.width, img.height)
        console.log(originalData)
        processData(ctx, originalData)
      })
    }
  }
})
