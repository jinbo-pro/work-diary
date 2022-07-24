const canvas = document.getElementById('canvas')
const colorEl = document.getElementById('color')
const ctx = canvas.getContext('2d')

let size = 5
let isPressed = false
let color = '#252525'
colorEl.value = color
let x = null
let y = null
// 鼠标按下开始绘画
canvas.addEventListener('mousedown', (e) => {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
})
// 鼠标放开停止绘画
canvas.addEventListener('mouseup', (e) => {
  isPressed = false
  x = null
  y = null
})
// 超出 canvas 边界时使用 document 停止绘画
document.addEventListener('mouseup', (e) => {
  isPressed = false
  x = null
  y = null
})
// 移动鼠标绘画
canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    // 圆弧路径
    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
})
// 绘制圆
function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}
// 绘制线
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

/**
 * 手写板功能操作
 */
const sizeEl = document.getElementById('size')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const clearEl = document.getElementById('clear')

increaseBtn.addEventListener('click', () => {
  size += 5
  if (size > 50) {
    size = 50
  }
  sizeEl.innerText = size
})

decreaseBtn.addEventListener('click', () => {
  size -= 5
  if (size < 5) {
    size = 5
  }
  sizeEl.innerText = size
})

colorEl.addEventListener('change', (e) => (color = e.target.value))
clearEl.addEventListener('click', () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
)

/**
 * 保存 canvas 为图片
 */
function saveFile() {
  const dataURL = canvas.toDataURL('image/png')
  const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
  saveLink.href = dataURL
  saveLink.download = 'canvas'
  const event = document.createEvent('MouseEvents')
  event.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )
  saveLink.dispatchEvent(event)
}
