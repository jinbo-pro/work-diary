/**
 * 更好的定时器管理
 */
export class McTimer {
  constructor(options) {
    const o = {
      count: 0, // 执行次数
      step: 1, // 步进值
      ms: 1000, // 执行频率
      immediate: true, // 是否立即执行
      complete: () => {}, // 执行回调
      done: () => {} // 完成的回调
    }
    this.options = Object.assign({}, o, options)
    this.init()
    if (this.options.immediate) {
      this.start()
    }
  }
  // 初始化
  init() {
    this.count = this.options.count
    this.isDone = false
    this.isPaused = false
    this.timerval = null
  }
  // 执行器
  actuator() {
    const { complete, done, ms, step } = this.options
    const run = () => {
      complete(this.count)
      if (this.count <= 0) {
        this.stop()
        done(this)
        return false
      }
      this.count -= step
      return true
    }
    if (!this.isDone) {
      let isNext = run()
      if (!isNext) return
    }
    this.timerval = setInterval(run, ms)
  }
  // 停止
  stop() {
    clearInterval(this.timerval)
    this.timerval = null
    this.isPaused = true
    this.isDone = true
  }
  // 开始
  start() {
    const { count } = this.options
    if (isNaN(Number(count))) {
      console.warn('count 值应为数字')
      return
    }
    if (this.isDone) {
      this.reset()
      return
    }
    if (this.timerval) return
    this.actuator()
  }
  // 暂停/继续
  paused() {
    if (this.isDone) return
    if (this.isPaused) {
      this.isPaused = false
      this.actuator()
    } else {
      this.isPaused = true
      clearInterval(this.timerval)
    }
  }
  // 重置
  reset() {
    this.stop()
    this.init()
    this.start()
  }
}
