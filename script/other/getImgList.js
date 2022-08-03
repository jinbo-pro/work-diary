/**
 * 爬取游侠网资讯脚本
 */

const { deerTools, myUtils } = require('D:/myPackage')

var resultImgList = []

// 开始下载
;(async function () {
  // var infoPageUrlList = []
  var infoPageUrlList = await getNewHomeList()
  var promiseList = []
  for (let item of infoPageUrlList) {
    promiseList.push(distribute([item]))
  }
  await Promise.all(promiseList)
  writeFileImgList()
})()

// 读取资讯首页，获取详情页地址列表
async function getNewHomeList() {
  const newDynamic = 'https://www.ali213.net/news/amuse' // 最新动态地址
  let res = await deerTools.api.apiGet(newDynamic)
  let $ = myUtils.getDom(res)
  let aList = $('.news_list .lone_t a')
  let result = []
  aList.each((index, item) => {
    if (item.href) {
      result.push(item.href)
    }
  })
  return result
}
// 分发请求
async function distribute(list) {
  var resultList = [...list]
  for (let i = 0; i < resultList.length; i++) {
    let item = resultList[i]
    console.log(item, '-->>> item')
    let type = /_[\d]+\.html/.test(item) ? '' : 'frist'
    let pageImgList = await getInfoPageImg(item, resultList, type)
    resultImgList.push(...pageImgList)
  }
  return
}
// 获取详情页的图片地址
async function getInfoPageImg(pageUrl, resultList, type) {
  try {
    var pageImgList = []
    let res = await deerTools.api.apiGet(pageUrl, {}, { timeout: 2000 })
    let $ = myUtils.getDom(res)
    // 404页面跳过
    if (/404/.test($('title').text())) {
      console.log('--- 404 ---')
      return []
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
    // 获取剩余页数
    if (type == 'frist') {
      var pageStr = $('#Content .page_fenye span').last().text()
      if (!pageStr) return pageImgList
      var pageCount = parseInt(pageStr.replace('共', ''))
      for (let page = 2; page <= pageCount; page++) {
        let newPageUrl = pageUrl.replace(/([\d]+?)\.html/, (all, item) => {
          return `${item}_${page}.html`
        })
        resultList.push(newPageUrl)
      }
    }
    return pageImgList
  } catch (error) {
    console.log(error, '【详情页面】下载出错! -->>> getPageStr err')
    return pageImgList
  }
}
// 写入文件
function writeFileImgList() {
  let jpgList = []
  let pngList = []
  let gifList = []
  resultImgList = [...new Set(resultImgList)]
  resultImgList.forEach((item) => {
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
  deerTools.file.writeTxt('../mock/imgListjson.json', result)
  return console.log('-->>> 写入完成')
}
