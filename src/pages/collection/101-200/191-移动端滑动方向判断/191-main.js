/**滑动方向 */
class TouchDirection {
  constructor(dom, handle) {
    this.dom = dom
    this.state = {
      startx: '',
      starty: ''
    }
    this.init(handle)
  }
  init(handle) {
    // 手指接触屏幕
    this.dom.addEventListener(
      'touchstart',
      (e) => {
        this.state.startx = e.touches[0].pageX
        this.state.starty = e.touches[0].pageY
      },
      false
    )
    this.dom.addEventListener(
      'touchend',
      (e) => {
        let endx, endy
        endx = e.changedTouches[0].pageX
        endy = e.changedTouches[0].pageY
        let [x, y] = this.getDirection(endx, endy)
        if (typeof handle === 'function') {
          handle(x, y)
        }
      },
      false
    )
  }
  /**
   * 获取方向
   * @param {number} endx
   * @param {number} endy
   * @returns 坐标轴象限
   */
  getDirection(endx, endy) {
    const angx = endx - this.state.startx
    const angy = endy - this.state.starty
    // 如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return [0, 0]
    }
    const angle = (Math.atan2(angy, angx) * 180) / Math.PI
    const step = 30
    const a = Math.abs(angle)
    let y = angle < 0 ? 1 : -1
    if (a > 180 - step) {
      return [-1, 0]
    } else if (a > 90 + step) {
      return [-1, 1 * y]
    } else if (a > 90 - step) {
      return [0, 1 * y]
    } else if (a > step) {
      return [1, 1 * y]
    } else {
      return [1, 0]
    }
  }
}

const touchBox = document.getElementById('touchBox')
new TouchDirection(touchBox, (x, y) => {
  console.log(x, y)
  const xMap = { '-1': '左', 0: '', 1: '右' }
  const yMap = { '-1': '下', 0: '', 1: '上' }
  touchBox.innerText = xMap[x] + yMap[y]
})
