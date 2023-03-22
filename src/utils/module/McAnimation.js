/**
 * 函数接收 x 轴坐标值， 只需要传入匀速变化的 x 值(从 0 到 1) 即可得到具有缓动效果的 y 轴坐标值
 * 更多缓动函数参见 https://easings.net/cn
 */

const easeFn = {
  // 匀-匀-慢
  easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3)
  },
  // 快-匀-慢
  easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
  },
  // 匀-快-弹
  easeOutBack(x) {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
  },
  // 弹-匀-弹
  easeInOutBack(x) {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
  }
}

/**
 * 缓动动画类
 */
export class McAnimation {
  constructor(dom, distance = 1200, ease = 'easeOutCubic') {
    this.x = 0
    this.hz = 13
    this.dom = dom
    this.ease = ease
    this.distance = distance
  }
  // 整理起始值和结束值
  formatValue(styleJson) {
    let startValueMap = {}
    for (let attr in styleJson) {
      startValueMap[attr] = {
        startVal: this.getStyleVal(attr),
        endVal: this.parseValue(attr, styleJson[attr])
      }
    }
    return startValueMap
  }
  // x 轴边界
  xBoundary() {
    return +this.x.toFixed(3) < 1
  }
  getValueStep(startVal, endVal) {
    if (!this.xBoundary()) {
      return endVal
    } else {
      let fn = easeFn[this.ease]
      if (!fn) {
        console.error(this.ease, '函数不存在')
        return endVal
      }
      let y = fn(this.x)
      let yStep = startVal + (endVal - startVal) * y
      let result = startVal < startVal ? Math.ceil(yStep) : Math.floor(yStep)
      return result
    }
  }
  start(styleJson) {
    let startValueMap = this.formatValue(styleJson)
    return new Promise((resolve, reject) => {
      const task = () => {
        let endFlag = true
        let xStep = 1 / (this.distance / this.hz)
        this.x += xStep
        for (let attr in startValueMap) {
          let item = startValueMap[attr]
          let result = this.getValueStep(item.startVal, item.endVal, this.x, this.distance)
          this.setStyleVal(attr, result)
          if (this.xBoundary() || result != item.endVal) {
            endFlag = false
          }
        }
        if (endFlag) {
          this.stop()
          resolve(this.dom)
        }
      }
      if (this.dom._anist) {
        this.stop()
      }
      this.dom._anist = setInterval(task, this.hz)
    })
  }
  stop() {
    clearInterval(this.dom._anist)
    this.dom._anist = null
  }
  getStyleVal(attr) {
    var domStyle = getComputedStyle(this.dom, null)[attr]
    return this.parseValue(attr, domStyle)
  }
  parseValue(attr, value) {
    let result = 0
    if (attr === 'opacity') {
      result = Math.round(parseFloat(value) * 1000)
    } else {
      result = parseFloat(value)
    }
    return result
  }
  setStyleVal(attr, value) {
    if (attr === 'opacity') {
      this.dom.style[attr] = value / 1000
    } else {
      this.dom.style[attr] = value + 'px'
    }
  }
}

/**
 * 创建缓动动画
 * @param {HTMLElement} dom dom
 * @param {any} json style
 * @param {number} distance 动画时长-毫秒
 * @param {string} ease 动画类型
 * @returns
 */
export async function startAnimation(dom, json, distance = 1200, ease) {
  let domAni = new McAnimation(dom, distance, ease)
  return domAni.start(json)
}
