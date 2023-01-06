const fs = require('fs')
const path = require('path')
const { getConfigCode, checkDir } = require('./common')
const { gameRootDir } = require('./config')

/**获取初始数据 */
async function getInitData() {
  const diyFilePath = path.join(gameRootDir, './main.bundle-diy.js')
  const diyIsFile = await checkDir(diyFilePath)
  let text = ''
  if (diyIsFile) {
    text = fs.readFileSync(diyFilePath).toString()
  } else {
    text = fs.readFileSync(path.join(gameRootDir, './main.bundle.js')).toString()
  }
  return getConfigCode(text)
}
/**更新 */
function update(data) {
  const text = fs.readFileSync(path.join(gameRootDir, './main.bundle.js')).toString()
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
  fs.writeFileSync(path.join(gameRootDir, './main.bundle-diy.js'), result)
  // 修改 html 的引入文件
  const htmlPath = path.join(gameRootDir, './index.html')
  const indexHtml = fs.readFileSync(htmlPath).toString()
  if (/bundle-diy/.test(indexHtml)) return
  const newHtml = indexHtml.replace('main.bundle.js', 'main.bundle-diy.js')
  fs.writeFileSync(htmlPath, newHtml)
}
/**重置修改 */
function reset() {
  const text = fs.readFileSync(path.join(gameRootDir, './main.bundle.js')).toString()
  fs.writeFileSync(path.join(gameRootDir, './main.bundle-diy.js'), text)
}

module.exports = {
  getInitData,
  update,
  reset
}
