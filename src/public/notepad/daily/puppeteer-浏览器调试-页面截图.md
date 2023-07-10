[toc]

## 简介



## main.js
puppeteer 可以模拟浏览器操作，用于自动化测试或做脚本爬虫等操作

```js
const path = require('path')
const puppeteer = require('puppeteer')
const { token, pageList } = require('./config')
const { concurrencyTask, sleep, getPageUrl } = require('./utils')

const distPath = path.resolve(__dirname, './dist')

/**
 * puppeteer
 * APi 参考: https://puppeteer.bootcss.com/api
 */

/**
 * 获取页面截图
 * @param {puppeteer.Browser} browser 
 * @param {any} item 
 * @param {number} index 
 */
async function getPageScreenshot(browser, item, index) {
  // 创建一个页面
  const page = await browser.newPage()
  // 设置浏览器视窗
  page.setViewport({ width: 1366, height: 768 })

  // 输入网页地址
  const pageUrl = getPageUrl(item.degBpmnTypeId, item.degBpmnRunInstanceId)
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded' })
  // 设置浏览器token
  await page.evaluate(() => {
    sessionStorage.setItem('token', token)
  })
  // 延迟一下等待浏览器的js执行完毕
  await sleep(1200)
  // 开始截图，全屏截图的关键参数就是这个fullPage，页面会一直滚动到底
  await page.screenshot({
    path: path.join(distPath, `${index}-${item.title}.png`),
    fullPage: true
  })

  await page.close()
}

async function main() {
  // 启动浏览器
  const browser = await puppeteer.launch({
    headless: false // 是否隐藏浏览器
  })

  const requestList = pageList.map((item, index) => {
    return () =>
      getPageScreenshot(browser, item, index)
        .then(() => {
          console.log(index, item.title)
          return true
        })
        .catch(() => false)
  })
  const res = await concurrencyTask(requestList, 3)
  console.log(res, '-->>> 执行完毕')

  // 关闭浏览器
  await browser.close()
}

main()

```

## config.js

```js
/**登录用户token */
const token = '12ccbde1-9d6c-40f0-8f56-59954cbea015'

/**页面列表 */
const pageList = [
  {
    title: '关于开展重大水利工程移民安置工作现场检查督导的通知',
    degBpmnTypeId: '8ee1ffd75e0346eba3810c0353474e61',
    degBpmnRunInstanceId: 'cda1167d47124d30860030a282d87b86'
  },
  {
    title: '省委十二届三次全会精神宣讲情况统计表（办公室）',
    degBpmnTypeId: '566a8a6cbb3b45d599c43892e0273bd0',
    degBpmnRunInstanceId: '51fe6942b61b439e8398bd3e6a2803db'
  },
  {
    title: '“追寻足迹强党性，三苏祠里学家风”—一人才中心党支部开展廉洁文化教育活动',
    degBpmnTypeId: '60b853e9a462418d912f2fb6c7e6ffa9',
    degBpmnRunInstanceId: '1a69802461f14c819b51e6a9a005a00a'
  },
  {
    title: '关于完善长江经济带突出问题整改方案的函',
    degBpmnTypeId: '2d91be563bf442e7bc2e7c4a0a6d39b7',
    degBpmnRunInstanceId: 'e9bab8ce09f042d18b2cc4b478e2b773'
  }
]

module.exports = {
  token,
  pageList
}

```

## utils.js

```js
/**延时 */
function sleep(t = 500) {
  return new Promise((a) => setTimeout(a, t))
}
/**获取页面路径 */
function getPageUrl(degBpmnTypeId, degBpmnRunInstanceId) {
  return `http://172.18.0.28/oa/#/lookDocument?degBpmnTypeId=${degBpmnTypeId}&degBpmnRunInstanceId=${degBpmnRunInstanceId}`
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
  sleep,
  getPageUrl,
  concurrencyTask
}

```