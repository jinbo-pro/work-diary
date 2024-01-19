// 增长曲线 摘自 CountUp.js
function easeOutExpo(t, b, c, d) {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

// 判断数据是否超出
function isoverflow(currentNum, endVal, countDown) {
  currentNum = Math.ceil(currentNum)
  if (countDown && currentNum <= endVal) return endVal
  if (!countDown && currentNum >= endVal) return endVal
  return currentNum
}

class CountUpManage {
  constructor(value, arg) {
    this.value = value
    // 指令参数 arg 备用拓展
    this.arg = arg
    this.time = null
  }
  start(newValue, change) {
    var startVal = this.value
    var endVal = newValue
    if (startVal == endVal) return
    const F = 1000 / 60 // 运动帧率 60 帧
    var duration = 800 // 动画时长
    var address = Math.abs(endVal - startVal)
    var countDown = startVal > endVal
    var currentNum = startVal
    var progress = 0

    this.time = setInterval(() => {
      if (currentNum == endVal) {
        this.clear()
      } else {
        if (countDown) {
          currentNum = startVal - easeOutExpo(progress, 0, address, duration)
        } else {
          currentNum = easeOutExpo(progress, startVal, address, duration)
        }
        progress += F
        currentNum = isoverflow(currentNum, endVal, countDown)
        this.value = currentNum
        change(this.value)
      }
    }, F)
  }
  clear() {
    if (this.time) {
      clearInterval(this.time)
      this.time = null
    }
  }
}

/**@type {WeakMap<HTMLElement, CountUpManage>()} */
const domMap = new WeakMap()

/**数字变化动画指令 */
export const numberChangeDirective = {
  bind(el, binding) {
    if (!domMap.has(el)) {
      domMap.set(el, new CountUpManage(binding.value, binding.arg))
    }
  },
  update(el, binding) {
    if (!domMap.has(el)) return
    const count = domMap.get(el)
    const newValue = Number(binding.value)
    if (isNaN(newValue)) return
    if (newValue === count.value) return
    if (count.time) {
      // 清除原有的定时器
      count.clear()
    }
    count.start(newValue, (num) => {
      el.innerHTML = el.innerHTML.replace(/\d+/, num)
    })
  },
  unbind(el) {
    if (domMap.has(el)) {
      const count = domMap.get(el)
      count.clear()
      domMap.delete(el)
    }
  }
}

/**
 * 使用示例
 * <div v-numberchange="count">{{ count }}</div>
 */
