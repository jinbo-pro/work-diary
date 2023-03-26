const fs = require('fs')
const { resolve } = require('./utils')
const getFileFlatList = require('../app/utils/getFileFlatList')

/**
 * 获取页面目录数据
 */
function getpageDataListGz() {
  const list = getFileFlatList(resolve('/src/pages/collection'), true)
  let metaConfig = {}
  for (let item of list) {
    if (item.isFile && item.fileName == 'm.json') {
      const meta = require(item.filePath)
      metaConfig[meta.name] = meta.tag
    }
  }
  const dirList = ['pages/collection', 'public/notepad', 'public/loading']
  const pageDataList = dirList.reduce((p, c) => {
    const srcFileList = getFileFlatList(resolve(`src/${c}`))
    const resultList = srcFileList.filter((e) => {
      return !e.isFile || e.fileName.endsWith('.html') || e.fileName.endsWith('.md')
    })
    for (let item of resultList) {
      if (c == 'pages/collection') {
        const tag = metaConfig[item.fileName]
        if (tag) {
          item.meta = { name: item.fileName, tag }
        }
      } else {
        item.filePath = item.filePath.replace(/\/public/, '')
      }
    }
    p[c] = resultList
    return p
  }, {})
  fs.writeFileSync(resolve('src/public/pageDataList.json'), JSON.stringify(pageDataList))
}

module.exports = getpageDataListGz