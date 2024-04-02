/**
 * 加载图片
 * @param {string} src 图片地址
 * @returns {Promise<HTMLImageElement>}
 */
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}
/**
 * 获取像素信息
 * @param {ImageData} imageData
 */
function getPixelInfo(imageData) {
  // see: https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData
  const { data, width } = imageData
  const result = []
  let col = 0
  for (let i = 0; i < data.length; i += 4) {
    if (i > 0 && i % (width * 4) == 0) {
      col++
    }
    const color = `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${(data[i + 3] / 255).toFixed(2)})`
    if (result[col]) {
      result[col].push(color)
    } else {
      result[col] = [color]
    }
  }
  return result
}
/**像素点渲染大小 */
const pw = 1

/**
 * dom盒子渲染
 * @param {string[][]} pixelList
 * @param {HTMLDivElement} boxDom
 */
function createBoxRender(pixelList, boxDom) {
  for (let data of pixelList) {
    const colDiv = document.createElement('div')
    colDiv.style.display = 'flex'
    for (let item of data) {
      const div = document.createElement('div')
      div.style.width = pw + 'px'
      div.style.height = pw + 'px'
      div.style.backgroundColor = item
      colDiv.appendChild(div)
    }
    boxDom.appendChild(colDiv)
  }
}

/**
 * dom盒子 box-shadow 渲染
 * @param {string[][]} pixelList
 */
function createBoxShadowRender(pixelList) {
  let styleList = []
  for (let i = 0; i < pixelList.length; i++) {
    for (let j = 0; j < pixelList[i].length; j++) {
      styleList.push(`${j * pw}px ${i * pw}px 0 ${pixelList[i][j]}`)
    }
  }
  const dom = `<div style="width: ${pw}px;height: ${pw}px;box-shadow: ${styleList.toString() + ';'};"></div>`
  document.body.innerHTML += dom
}

async function main() {
  /**@type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const imgUrl = '/logo.png'
  const img = await loadImg(imgUrl)
  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, img.width, img.height)
  console.log(imageData)
  const pixelList = getPixelInfo(imageData)
  // 渲染像素点-1
  createBoxRender(pixelList, document.getElementById('box'))
  // 渲染像素点-2 此功能比较消耗性能
  // createBoxShadowRender(pixelList, document.getElementById('boxShow'))
}
main()
