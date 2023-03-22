/**
 * 定时器管理-mini版
 */
export class McTimerMini {
  constructor(count) {
    this.initCount = count
    this.count = count
    this.timr = null
  }
  start(callBack) {
    this.clearTimr()
    this.timr = setInterval(() => {
      if (typeof callBack == 'function') {
        callBack(this.count)
      }
      if (this.count <= 0) {
        this.clearTimr()
        return
      }
      this.count--
    }, 1000)
  }
  reset() {
    this.clearTimr()
    this.count = this.initCount
  }
  clearTimr() {
    if (this.timr) {
      clearInterval(this.timr)
      this.timr = null
    }
  }
}
