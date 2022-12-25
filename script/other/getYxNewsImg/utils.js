const { JSDOM } = require('jsdom')
const request = require('request')

/**
 * 解析虚拟页面供 jquery 操作
 * @param {string} pageStr
 */
function getDom(pageStr) {
  pageStr = pageStr || '<!doctype html><html><body></body></html>'
  const { document } = new JSDOM(pageStr).window
  global.document = document
  const window = document.defaultView
  const $ = require('jquery')(window)
  return $
}
/**
 * api get
 * @param {string} url
 * @param {any} data
 */
function apiGet(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'GET',
      qs: data,
      ...config,
      callback: (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      }
    })
  })
}
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

module.exports = {
  getDom,
  apiGet,
  concurrencyTask
}
