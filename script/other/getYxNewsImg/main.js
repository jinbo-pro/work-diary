/**
 * 爬取游侠网资讯脚本
 */
const fs = require('fs')
const { getDom, apiGet, concurrencyTask } = require('./utils')
const newDynamic = 'https://www.ali213.net/news/amuse' // 最新动态地址
// next page: https://www.ali213.net/news/amuse/index_2.html
const resultImgList = []

// 读取资讯首页，获取详情页地址列表
async function getNewHomeList() {
  let res = await apiGet(newDynamic)
  let $ = getDom(res)
  let aList = $('.news_list .lone_t a')
  let result = []
  aList.each((index, item) => {
    if (item.href) {
      result.push(item.href)
    }
  })
  return result
}
// 解析页面图片地址
async function parsePageImg(pageUrl) {
  let pageUrlList = [pageUrl]
  for (let itemUrl of pageUrlList) {
    console.log(itemUrl, '-->>> itemUrl')
    let type = /_[\d]+\.html/.test(itemUrl) ? '' : 'frist'
    try {
      const { pageImgList, nextPageUrl } = await getInfoPageImg(itemUrl, type)
      resultImgList.push(...pageImgList)
      pageUrlList.push(...nextPageUrl)
    } catch (error) {
      console.log(error, 'parsePageImg')
    }
  }
}
/**获取详情页的图片地址 */
async function getInfoPageImg(pageUrl, type) {
  let pageImgList = []
  let nextPageUrl = []
  let res = await apiGet(pageUrl, {}, { timeout: 2000 })
  let $ = getDom(res)
  // 404页面跳过
  if (/404/.test($('title').text())) {
    console.log('--- 404 ---')
    return { pageImgList, nextPageUrl }
  }
  // 匹配图片
  let imgs = $('#Content img')
  imgs.each((index, item) => {
    pageImgList.push(item.src)
  })
  // 读取图片解析代码
  $('#Content script').each((index, item) => {
    var $item = $(item)
    var text = $item.text()
    if (/eval/.test(text)) {
      var _evalStr = eval(text.replace(/eval/, ''))
      _evalStr.replace(/(https:[^\+]+?)",/g, (all, src) => {
        pageImgList.push(src.replace(/\\/g, ''))
      })
    }
  })
  // 获取分页链接
  if (type == 'frist') {
    var pageStr = $('#Content .page_fenye span').last().text()
    if (!pageStr) return { pageImgList, nextPageUrl }
    var pageCount = parseInt(pageStr.replace('共', ''))
    for (let page = 2; page <= pageCount; page++) {
      let url = pageUrl.replace(/([\d]+?)\.html/, (all, item) => {
        return `${item}_${page}.html`
      })
      nextPageUrl.push(url)
    }
  }
  return { pageImgList, nextPageUrl }
}
/**写入文件 */
function writeFileImgList() {
  let jpgList = []
  let pngList = []
  let gifList = []
  // 文件去重分类
  const resultList = [...new Set(resultImgList)]
  resultList.forEach((item) => {
    if (item.endsWith('.jpg') || item.endsWith('.jpeg')) {
      let endNameMath = item.match(/[\d]+?\.jpg/)
      let endName = endNameMath ? endNameMath[0] : null
      let flag = jpgList.find((e) => {
        return e.includes(endName)
      })
      if (!flag) {
        jpgList.push(item)
      }
    }
    if (item.endsWith('.png') && !/placeholder/.test(item)) {
      pngList.push(item)
    }
    if (item.endsWith('.gif')) {
      gifList.push(item)
    }
  })
  let result = { jpgList, pngList, gifList }
  fs.writeFileSync('./imgListjson.js', `const imgListjson = ${JSON.stringify(result, null, '\t')}`)

  console.log('-->>> 写入完成')
}

// 开始下载
async function main() {
  const infoPageUrlList = await getNewHomeList()
  const promiseList = infoPageUrlList.map((e) => () => parsePageImg(e))
  await concurrencyTask(promiseList, 3)
  console.log('-->>> 执行完毕')
  writeFileImgList()
}
main()
