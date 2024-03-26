/**
 * 并发任务组
 * @param {Array<() => Promise<any>>} tasks 任务数组
 * @param {number} limit 最大并发数
 */
function concurrencyTask(tasks, limit = 2) {
  const len = tasks.length
  if (len === 0) return Promise.resolve([])
  return new Promise((resolve) => {
    let index = 0
    let count = 0
    const result = []
    function run() {
      const i = index
      const task = tasks[index]
      index++
      task()
        .then((res) => {
          result[i] = res
        })
        .catch((e) => {
          result[i] = e
        })
        .finally(() => {
          count++
          if (count === len) {
            resolve(result)
          }
          if (index < len) {
            run()
          }
        })
    }
    for (let i = 0; i < Math.min(limit, len); i++) {
      run()
    }
  })
}

module.exports = concurrencyTask

/**
 * 使用示例
 *
 const list = []
 for (let i = 0; i < 10; i++) {
   const fn = () => fetch('xxx').then((res) => {
     console.log(i, '-->>> i')
     return res
   })
   list.push(fn)
 }
 concurrencyTask(list, 3).then((res) => {
   console.log(res, '-->>> 执行完毕')
 })
 */
