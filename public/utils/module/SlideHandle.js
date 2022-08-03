/**
 * 鼠标-滑动控制
 */
export class SlideHandle {
  constructor(options) {
    const o = {
      el: null,
      move: (x, y) => {},
      moveEnd: (x, y) => {},
      moveStart: (x, y) => {}
    }
    this.options = Object.assign({}, o, options)
    this.init()
  }
  init() {
    const { el, xRange, yRange } = this.options
    if (!(el instanceof HTMLElement)) {
      return console.warn('请传入容器 dom')
    }
    this.app = this.options.el
    // 初始化拖动范围 默认为父级宽高
    this.parentDom = this.app.parentElement
    if (!Array.isArray(xRange)) {
      const pw = this.parentDom.clientWidth
      this.options.xRange = [0, pw]
    }
    if (!Array.isArray(yRange)) {
      const ph = this.parentDom.clientHeight
      this.options.yRange = [0, ph]
    }
    this.xIv = 0
    this.yIv = 0
    this.sliderX = 0
    this.sliderY = 0
    this.isMouseDown = false
    this.bindEvents()
  }
  getPoint(e, type) {
    // 获取父级的相对距离
    const pNode = this.app.parentElement
    if (type == 'mouse') {
      return {
        x: e.clientX - pNode.offsetLeft - this.xIv,
        y: e.clientY - pNode.offsetTop - this.yIv
      }
    } else {
      const t = e.changedTouches[0]
      return {
        x: t.pageX - pNode.offsetLeft - this.xIv,
        y: t.pageY - pNode.offsetTop - this.yIv
      }
    }
  }
  boundary(x, y) {
    const w = this.app.clientWidth
    const h = this.app.clientHeight
    const [xMin, xMax] = this.options.xRange
    const [yMin, yMax] = this.options.yRange
    if (x < xMin || x >= xMax - w || y < yMin || y >= yMax - h) return true
  }
  bindEvents() {
    // pc event
    this.app.addEventListener('mousedown', (e) => this.sliderDown(e, 'mouse'))
    document.addEventListener('mousemove', (e) => this.handleMoveEvent(e, 'mouse'))
    document.addEventListener('mouseup', (e) => this.handleMoveEndEvent(e))
    // mobile event
    this.app.addEventListener('touchstart', (e) => this.sliderDown(e, 'touch'))
    this.app.addEventListener('touchmove', (e) => this.handleMoveEvent(e, 'touch'))
    this.app.addEventListener('touchend', (e) => this.handleMoveEndEvent(e))
  }
  sliderDown(e, type) {
    let x = 0
    let y = 0
    if (type == 'mouse') {
      x = e.clientX
      y = e.clientY
    } else {
      const t = e.changedTouches[0]
      x = t.pageX
      y = t.pageY
    }
    // see: $.offset()
    const rect = this.app.getBoundingClientRect()
    const win = this.app.ownerDocument.defaultView
    const top = rect.top + win.pageYOffset
    const left = rect.left + win.pageXOffset
    this.xIv = x - left
    this.yIv = y - top
    this.isMouseDown = true
    this.options.moveStart(x, y)
  }
  handleMoveEvent(e, type = 'mouse') {
    if (!this.isMouseDown) return false
    const { x, y } = this.getPoint(e, type)
    if (this.boundary(x, y)) return false
    this.sliderX = x
    this.sliderY = y
    this.options.move(x, y)
    this.app.style.left = x + 'px'
    this.app.style.top = y + 'px'
  }
  handleMoveEndEvent() {
    if (!this.isMouseDown) return false
    this.isMouseDown = false
    this.options.moveEnd(this.sliderX, this.sliderY)
  }
  clear() {
    document.removeEventListener('mousemove', this.handleMoveEvent)
    document.removeEventListener('mouseup', this.handleMoveEndEvent)
    this.app.removeEventListener('mousedown', this.sliderDown)
    this.app.removeEventListener('touchstart', this.sliderDown)
    this.app.removeEventListener('touchmove', this.handleMoveEvent)
    this.app.removeEventListener('touchend', this.handleMoveEndEvent)
  }
}
