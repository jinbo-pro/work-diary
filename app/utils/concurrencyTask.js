/**
 * 并发任务管理器
 * @param {Array<() => Promise<any>>} tasks 任务数组
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
      console.log(error, `执行出错 x-x`)
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

/**
 * 并发下载任务
 * @param {Array<() => Promise<any>>} tasks 任务数组
 * @param {number} limit 并发数
 */
async function queueDowload(list, limit = 3) {
  let concurrentDownloads = 0 // 当前并发下载数
  let taskList = new Set()
  for (let fn of list) {
    // 如果当前并发下载数已达到最大限制，等待一个下载任务完成后再继续
    while (concurrentDownloads >= limit) {
      await new Promise((a) => setTimeout(a, 300))
    }
    concurrentDownloads++
    const pms = fn()
    taskList.add(pms)
    pms.finally(() => {
      taskList.delete(pms)
      concurrentDownloads--
    })
  }
  if (taskList.size) {
    return Promise.all([...taskList])
  }
}

/**
 * 更加完善，更加好用的队列管理器推荐 async 库里面的 queue
 *
 * async/queue
 * https://unpkg.com/async@3.2.4/queue.js
 *
 * other documents
 * https://my.oschina.net/huangsz/blog/176203
 */

module.exports = {
  concurrencyTask,
  queueDowload
}

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
 // 或者
 queueDowload(list, 3).then((res) => {
   console.log(res, '-->>> 执行完毕')
 })
 */

/**
 * 特点：可以每次只会同时下载最多3个文件，
 * 当有一个下载任务完成后，会开始下一个等待中的下载任务。
 * 通过控制并发下载数量，可以避免同时下载过多文件导致内存溢出的问题。
 *
 * 两个方法异同
 * 如果异步任务的时间短-比如小文件下载建议使用 concurrencyTask
 * 如果异步任务的时间长-比如大文件下载建议使用 queueDowload
 *
 * 长时间异步任务时 concurrencyTask 的问题是一个任务小组里面如果存在一个任务的下载时间很长那么整个小组都会等待他，而 queueDowload 则会灵活的加入下一个任务
 * 短时间异步任务时 queueDowload 的任务等待会有 300 毫秒的延迟，导致下载偏慢
 */
