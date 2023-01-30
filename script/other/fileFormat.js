const fs = require('fs')
const prettier = require('prettier')
/**可以处理的文件类型 */
const fileSuffixs = [
  '.vue',
  '.js',
  '.css',
  '.scss',
  '.less',
  '.ts',
  '.json',
  '.md'
]
/**
 * 检测文件是否可以整理格式
 * @param {string} name
 * @param {string[]} suffixList
 * @returns
 */
function checkFileIsParse(name, suffixList = []) {
  let list = suffixList.length ? suffixList : fileSuffixs
  return list.filter((e) => name.endsWith(e)).length != 0
}
/**
 * 获取对应的文件解析器
 * @param {string} filePath
 * @returns
 */
function getParser(filePath) {
  let names = filePath.split('.')
  let parser = names.slice(-1)[0]
  switch (parser) {
    case 'js':
      return 'babel'
    case 'jsx':
      return 'babel'
    case 'ts':
      return 'babel-ts'
    case 'tsx':
      return 'babel-ts'
    case 'md':
      return 'markdown'
    default:
      return parser
  }
}

function contentFormat(text, parser) {
  return prettier.format(text, {
    parser, // parser see: https://prettier.io/docs/en/options.html#parser
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 120
  })
}

function fileFormat(filePath, parser) {
  return new Promise((resolve, reject) => {
    parser = parser ? parser : getParser(filePath)
    try {
      let text = fs.readFileSync(filePath).toString()
      let result = contentFormat(text, parser)
      if (text === result) {
        process.stdout.write('█')
        return resolve()
      }
      fs.writeFile(filePath, result, (err) => {
        if (err) {
          reject(err)
        } else {
          process.stdout.write('█')
          resolve()
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 批量整理文件夹下文件格式
 * @param {any} fileFlatList deerTools.file.getFileFlatList(src)
 * @param {string[]} customFileSuffixs 需要整理的文件格式
 */
async function dirFormat(fileFlatList, customFileSuffixs = []) {
  let count = { success: 0, fail: 0, all: 0 }
  for (let item of fileFlatList) {
    if (!item.isFile || !checkFileIsParse(item.fileName, customFileSuffixs)) {
      continue
    }
    count.all++
    try {
      await fileFormat(item.filePath)
      count.success++
    } catch (error) {
      count.fail++
      console.log(item.filePath, 'error 解析失败')
    }
  }
  console.log(
    `\n目录下的[ ${count.all} ]个文件全部整理完毕 \n成功[ ${count.success} ]个，失败 [ ${count.fail} ]个`
  )
}

module.exports = {
  contentFormat,
  fileFormat,
  dirFormat
}
