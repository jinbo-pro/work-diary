const container = document.getElementById('app')

const canvas = document.createElement('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d', {
  willReadFrequently: true
})

// 粒子数量
const particleNum = 1500
// 绘制的文本
let text = ''
// 粒子对象数组
const particleList = new Array(particleNum)
// 开始移动的时间
let startMoveTime = 0

function getText() {
  return new Date().toLocaleString()
}

/**绘制粒子 */
function initParticle() {
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  // 循环创建每一个粒子点
  for (let i = 0; i < particleList.length; i++) {
    const rad = Math.random() * 2 * Math.PI
    const size = 2
    const r = canvas.height / 2
    const sx = cx + Math.cos(rad) * r
    const sy = cy + Math.sin(rad) * r
    particleList[i] = {
      // 起始位置
      sx,
      sy,
      // 半径
      size,
      // 目标位置
      x: sx,
      y: sy
    }
    drawParticle(particleList[i])
  }
}

/**获取像素点 */
function getBmp() {
  clearCanvas()
  const { width, height } = canvas
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'middle'
  ctx.font = '40px 微软雅黑'
  const textWidth = ctx.measureText(text).width
  ctx.fillText(text, (width - textWidth) / 2, height / 2)
  return ctx.getImageData(0, 0, width, height)
}
/**更新绘制 */
function update(imgData) {
  clearCanvas()
  const { width, height, data } = imgData
  // 取点
  const dis = 4 // 间距
  const pxls = [] // 目标点位
  for (let w = 0; w < width; w += dis) {
    for (let h = 0; h < height; h += dis) {
      const i = (w + h * width) * 4
      if (data[i] > 10) {
        pxls.push([w, h])
      }
    }
  }
  const count = Math.min(particleList.length, pxls.length)
  // 多少时间到达目标位置
  const duration = 400
  // 现在已经经过了多少时间
  const timeSpan = Date.now() - startMoveTime
  for (let i = 0; i < count; i++) {
    const p = particleList[i]
    const { sx, sy } = p
    const [tx, ty] = pxls[i]
    const disX = tx - sx
    const disY = ty - sy
    // 当前移动的偏移量
    let moveX = (disX / duration) * timeSpan
    let moveY = (disY / duration) * timeSpan
    if (Math.abs(moveX) > Math.abs(disX)) {
      moveX = disX
    }
    if (Math.abs(moveY) > Math.abs(disY)) {
      moveY = disY
    }
    // 设置新坐标位置
    p.x = sx + moveX
    p.y = sy + moveY
    drawParticle(p)
  }
}
/**清空画布 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/**刷新绘制 */
function fps() {
  requestAnimationFrame(() => {
    // 绘制文本
    const curText = getText()
    if (curText !== text) {
      text = curText
      // 更新颗粒的起始坐标
      for (let p of particleList) {
        p.sx = p.x
        p.sy = p.y
      }
      // 更新开始移动的时间点
      startMoveTime = Date.now()
    }
    // 获取像素点
    const imgData = getBmp()
    // 更新绘制
    update(imgData)
    fps()
  })
}

/**绘制粒子 */
function drawParticle(p) {
  const { x, y, size } = p
  ctx.beginPath()
  ctx.arc(x, y, size, 0, 2 * Math.PI)
  ctx.fillStyle = 'brown'
  ctx.fill()
}

function main() {
  container.append(canvas)
  initParticle()
  fps()
}
main()
