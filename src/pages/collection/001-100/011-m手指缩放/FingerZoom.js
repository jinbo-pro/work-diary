/**
 * 手势缩放
 */
class FingerZoom {
  constructor(config) {
    this.config = config
    this.dom = config.dom
    this.distance = {}
    this.scale = 1
    this.addEvent()
  }
  addEvent() {
    var that = this
    this.dom.addEventListener('touchstart', function (e) {
      that.handleTouch(e)
    })
    this.dom.addEventListener('touchmove', function (e) {
      that.handleTouch(e)
    })
    this.dom.addEventListener('touchend', function (e) {
      that.handleTouch(e)
    })
    this.dom.addEventListener('touchcancel', function (e) {
      that.handleTouch(e)
    })
  }
  handleTouch(e) {
    e.preventDefault()
    switch (e.type) {
      case 'touchstart':
        if (e.touches.length > 1) {
          this.distance.start = this.getDistance(
            {
              x: e.touches[0].screenX,
              y: e.touches[0].screenY
            },
            {
              x: e.touches[1].screenX,
              y: e.touches[1].screenY
            }
          )
        }
        break
      case 'touchmove':
        if (e.touches.length === 2) {
          origin = this.getOrigin(
            {
              x: e.touches[0].pageX,
              y: e.touches[0].pageY
            },
            {
              x: e.touches[1].pageX,
              y: e.touches[1].pageY
            }
          )
          this.distance.stop = this.getDistance(
            {
              x: e.touches[0].screenX,
              y: e.touches[0].screenY
            },
            {
              x: e.touches[1].screenX,
              y: e.touches[1].screenY
            }
          )
          this.scale = this.distance.stop / this.distance.start
          this.setScaleAnimation(this.scale)
        }
        break
      case 'touchend':
        this.scale = 1
        this.setScaleAnimation(this.scale)
        break
      case 'touchcancel':
        this.scale = 1
        this.setScaleAnimation(this.scale)
        break
      default:
    }
  }
  getOrigin(first, second) {
    return {
      x: (first.x + second.x) / 2,
      y: (first.y + second.y) / 2
    }
  }
  getDistance(start, stop) {
    return Math.sqrt(Math.pow(stop.x - start.x, 2) + Math.pow(stop.y - start.y, 2))
  }
  // 缩放操作
  setScaleAnimation(scale) {
    if (typeof this.config.setScale == 'function') {
      this.config.setScale(scale)
    }
  }
}
