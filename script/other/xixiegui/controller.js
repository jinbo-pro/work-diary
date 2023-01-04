const fs = require('fs')
const path = require('path')
const { getConfigCode } = require('./common')
const dir = 'G:/SteamLibrary/steamapps/common/Vampire Survivors/resources/app/.webpack/renderer'
const text = fs.readFileSync(path.join(dir, './main.bundle.js')).toString()

/**获取初始数据 */
function getInitData() {
  return getConfigCode(text)
}
/**更新 */
function update(data) {
  let replaceStrList = data.map((item) => {
    const { startIndex, endIndex } = item
    const str = text.slice(startIndex, endIndex)
    let newStr = str.replace(/'([\w]+)':[\w]+,/g, (all, k) => {
      let cur = item.content.find((x) => x.key == k)
      return cur ? `'${cur.key}':${cur.value},` : all
    })
    return { startIndex, endIndex, newStr }
  })
  // 组合修改的js
  let result = ''
  let index = 0
  for (let item of replaceStrList) {
    result += text.slice(index, item.startIndex) + item.newStr
    index = item.endIndex
  }
  result += text.slice(replaceStrList[replaceStrList.length - 1].endIndex)
  fs.writeFileSync(path.join(dir, './main.bundle-diy.js'), result)
  // 修改 html 的引入文件
  const htmlPath = path.join(dir, './index.html')
  const indexHtml = fs.readFileSync(htmlPath).toString()
  const newHtml = indexHtml.replace('main.bundle.js', 'main.bundle-diy.js')
  fs.writeFileSync(htmlPath, newHtml)
}
/**重置修改 */
function reset() {
  const htmlPath = path.join(dir, './index.html')
  const indexHtml = fs.readFileSync(htmlPath).toString()
  const newHtml = indexHtml.replace('main.bundle-diy.js', 'main.bundle.js')
  fs.writeFileSync(htmlPath, newHtml)
}

module.exports = {
  getInitData,
  update,
  reset
}
