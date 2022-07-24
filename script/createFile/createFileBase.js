const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { checkDir } = require('../../app/utils/file')
const outPath = path.resolve(__dirname, '../../public/collection')
const template = fs.readFileSync(path.resolve(__dirname, './temp2.html'))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * 获取控制台参数
 * @param {string} title
 */
function getConsoleData(title) {
  return new Promise((resolve) => {
    rl.question(`${title} \n`, (res) => {
      resolve(res)
    })
  })
}
/**数字补零 */
function prefixNum(num, length = 1) {
  if (!num) return ''
  return String(num).padStart(length, '0')
}
/**获取文件名最大索引 */
function getFileIndex(outPath) {
  let maxIndex = 0
  let countList = []
  let dirList = fs.readdirSync(outPath)
  for (let dir of dirList) {
    let fileList = fs.readdirSync(path.join(outPath, dir))
    for (let item of fileList) {
      let sortNum = 0
      item.replace(/^([\d]+)-/, (all, item) => {
        sortNum = parseInt(item)
        countList.push(sortNum)
      })
      if (sortNum > maxIndex) {
        maxIndex = sortNum
      }
    }
  }
  // 搜索序列是否存在空位
  for (var i = 1; i <= maxIndex; i++) {
    if (i != countList[i - 1]) {
      return prefixNum(i, 3)
    }
  }
  return prefixNum(maxIndex + 1, 3)
}
/**获取文件模板 */
function getFileTemp(fileInfo) {
  let tempStr = template.toString()
  tempStr = tempStr
    .replace(/\{fileName\}/, fileInfo.fileName)
    .replace(/\{count\}/, fileInfo.count)
  return tempStr
}
/**根据最大索引创建对应文件夹 */
function maxIndexDir(max) {
  let n = ~~(max / 100)
  if (!(max % 100)) {
    n = n - 1
  }
  const s = prefixNum(n * 100 + 1, 3)
  const e = prefixNum((n + 1) * 100, 3)
  return path.join(outPath, `${s}-${e}`)
}
/**创建文件 */
async function create() {
  const title = await getConsoleData('请输入 标题')
  const tag = await getConsoleData('请输入 标签')
  rl.close()
  const count = getFileIndex(outPath)
  const dir = maxIndexDir(count)
  await checkDir(dir)
  let fileName = count + '-' + (title || '新建文件')
  const getPath = (file) => path.join(dir, `${fileName}/${file}`)
  fs.mkdirSync(getPath(''))
  const m = { sort: count, name: fileName, tag }
  fs.writeFileSync(getPath('m.json'), JSON.stringify(m, null, '\t'))
  fs.writeFileSync(getPath(`${count}-main.js`), `console.log("${fileName}")`)
  fs.writeFileSync(
    getPath(`${count}-index.html`),
    getFileTemp({ fileName, count })
  )

  console.log(fileName, '创建成功')
}
create()
/**
 * 使用示例：
 * node .\createFileBase.js
 */
