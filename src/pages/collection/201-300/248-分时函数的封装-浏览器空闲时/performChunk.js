/**
 * 分片任务
 * @param {Array<any>} datas 数据
 * @param {(item:any, index:number) => void} taskHandle 任务处理函数
 * @param {(task: (goOn: () => boolean) => void) => void} scheduler 调度函数
 */
export function performChunk(datas, taskHandle, scheduler) {
  let i = 0
  function run() {
    if (i >= datas.length) return
    scheduler((goOn) => {
      while (goOn() && i < datas.length) {
        taskHandle(datas[i], i)
        i++
      }
      run()
    })
  }
  run()
}

/**
 * 浏览器分片任务器
 * @param {Array<any>} datas 数据
 * @param {(item:any, index:number) => void} taskHandle 任务处理函数
 */
export function browserPerformChunk(datas, taskHandle) {
  const scheduler = (task) => {
    // 每次浏览器渲染空闲时调用
    requestIdleCallback((idle) => {
      // 每次空闲多少时间久执行多久
      task(() => idle.timeRemaining() > 0)
    })
  }
  performChunk(datas, taskHandle, scheduler)
}

/**
 * 其他场景分片任务器
 * @param {Array<any>} datas 数据
 * @param {(item:any, index:number) => void} taskHandle 任务处理函数
 */
export function mockSetTimePerformChunk(datas, taskHandle) {
  const scheduler = (task) => {
    // 每100毫秒调用一次
    setTimeout(() => {
      // 每次执行10毫秒
      const now = performance.now()
      task(() => performance.now() - now <= 10)
    }, 100)
  }
  performChunk(datas, taskHandle, scheduler)
}
