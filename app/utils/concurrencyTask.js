/**
 * 并发任务管理器
 * @param {function[]} tasks 任务数组
 * @param {number} limit 并发数
 * @returns
 */
async function concurrencyTask(tasks, limit = 1) {
  const runTask = async (fnList) => {
    if (!fnList || !fnList.length) {
      return null
    }
    try {
      const pms = fnList.map((fn) => fn())
      return await Promise.all(pms)
    } catch (error) {
      console.log(`执行出错 x-x`)
      this.errorTasks.push(fnList)
      return null
    }
  }
  const result = []
  for (let i = 0, len = tasks.length; i < len; i += limit) {
    const value = await runTask(tasks.slice(i, i + limit))
    result.push(value)
  }
  return result
}

module.exports = concurrencyTask

/**
 * 使用示例
 *
 const list = []
 for (let i = 0; i < 10; i++) {
   const fn = () => fetch('xxx').then((res) => {
     console.log(i, '-->>> i')
   })
   list.push(fn)
 }
 concurrencyTask(list, 3).then((res) => {
   console.log(res, '-->>> 执行完毕')
 })
 */
