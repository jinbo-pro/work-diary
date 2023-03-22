const fs = require('fs')
const crypto = require('crypto')

/**
 * 读取文件目录树 - 扁平数据
 * @param {string} src 目录地址
 * @param {boolean} absolutely 是否获取绝对地址
 */
function getFileFlatList(src, absolutely = false) {
  const pathSlash = (p) => p.replace(/\\/g, '/')
  const createId = (s) => crypto.createHash('md5').update(s).digest('hex').slice(0, 8)
  const createItem = (id, pid, isFile, fileName, filePath) => {
    return { id, pid, isFile, fileName, filePath: pathSlash(filePath) }
  }
  const result = []
  const files = fs.readdirSync(src).map((f) => createItem(createId(f), createId(src), 0, f, `${src}/${f}`))
  for (const read of files) {
    const { fileName, filePath } = read
    const isFile = fs.statSync(filePath).isFile() ? 1 : 0
    const id = createId(filePath + fileName)
    const item = createItem(id, read.pid, isFile, fileName, filePath)
    result.push(item)
    if (!isFile) {
      const children = fs.readdirSync(filePath).map((f) => createItem(createId(f), id, 0, f, `${filePath}/${f}`))
      files.push(...children)
    }
  }
  if (!absolutely) {
    result.forEach((e) => {
      e.filePath = e.filePath.replace(pathSlash(src), '')
    })
  }
  return result
}

module.exports = getFileFlatList
