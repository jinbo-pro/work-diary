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
/**加密水印 */
function encodeImg(src) {
  const ctx = document.getElementById('canvas').getContext('2d')
  ctx.font = '16px Microsoft Yahei'
  ctx.fillText('我是暗水印', 10, 50)
  const textData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data
  const img = new Image()
  img.onload = function () {
    // 获取指定区域的canvas像素信息
    ctx.drawImage(img, 0, 0)
    const originalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    mergeData(ctx, textData, 'R', originalData)
  }
  img.src = src
}

/**解密水印 */
function decodeImg(src) {
  const ctx = document.getElementById('canvas-parse').getContext('2d')
  const img = new Image()
  img.onload = function () {
    // 获取指定区域的canvas像素信息
    ctx.drawImage(img, 0, 0)
    const originalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    console.log(originalData)
    processData(ctx, originalData)
  }
  img.src = src
}
encodeImg('/assets/logo.png')

// 解密水印
document.getElementById('btn').onclick = function () {
  const ctx = document.getElementById('canvas')
  const imgUrl = ctx.toDataURL('image/png')
  decodeImg(imgUrl)
}
