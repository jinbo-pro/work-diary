const fs = require('fs')

/**
 * 检查目录的可访问性
 * @param {string} dst 文件路径
 * @param {boolean} createDir 读取失败是否创建
 */
function checkDir(dst, createDir = true) {
  return new Promise((resolve, reject) => {
    fs.access(dst, fs.constants.F_OK, (err) => {
      if (err) {
        if (createDir) {
          fs.mkdirSync(dst)
          resolve(dst)
        } else {
          reject(err)
        }
      } else {
        resolve(dst)
      }
    })
  })
}

/**
 * 读取文件
 * @param {string} filePath
 * @returns {string}
 */
function readFileSync(filePath) {
  var dataString = ''
  try {
    var data = fs.readFileSync(filePath)
    dataString = data.toString()
  } catch (error) {
    console.log(error, '文件读取失败!')
  }
  return dataString
}

/**
 * 判断是否为文件
 * @param {string} p 路径
 * @returns number
 */
function checkIsFile(p) {
  return fs.statSync(p).isFile() ? 1 : 0
}

/**
 * 路径斜线转换
 * @param {string} p 路径
 * @returns
 */
function pathSlash(p) {
  return p.replace(/\\/g, '/')
}

/**
 * 深度优先遍历文件树
 * @param {string} src 文件夹路径
 * @param {function} func 回调
 */
function readNodeDfs(src, func) {
  const createItem = (fileName, filePath) => {
    let p = pathSlash(filePath)
    return { isFile: checkIsFile(p), fileName, filePath: p }
  }
  let files = fs.readdirSync(src).map((f) => createItem(f, src + '/' + f))
  var stark = []
  stark = stark.concat(files)
  while (stark.length) {
    var temp = stark.shift()
    if (!checkIsFile(temp.filePath)) {
      let children = fs.readdirSync(temp.filePath).map((f) => createItem(f, temp.filePath + '/' + f))
      stark = children.concat(stark)
    }
    func(temp)
  }
}

/**
 * 删除文件夹
 * @param {string} src 需要删除的文件夹路径
 * @param {boolean} delDir 是否删除文件夹
 */
function clearDir(src, delDir = true) {
  var files = []
  if (!fs.existsSync(src)) return
  files = fs.readdirSync(src)
  files.forEach((file, index) => {
    var curPath = src + '/' + file
    if (!checkIsFile(curPath)) {
      clearDir(curPath, delDir)
    } else {
      // delete file
      fs.unlinkSync(curPath)
    }
  })
  delDir && fs.rmdirSync(src)
}

/**
 * 修改文件名
 * @param {String} oldPath 原路径
 * @param {String} newPath 新路径
 */
function rename(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (!err) {
        resolve()
      } else {
        reject(err)
      }
    })
  })
}
/**
 * 拷贝单个文件
 * @param {string} _src 源路径
 * @param {string} _dst 输出路径
 */
function copyFile(_src, _dst) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(_src)
    const writeStream = fs.createWriteStream(_dst)
    readStream.pipe(writeStream)
    readStream.on('error', (err) => {
      console.log('fileCopy error:' + err)
      reject(err)
    })
    readStream.on('end', () => {
      console.log(_dst, `-->>> 复制成功!`)
      resolve(_dst)
    })
  })
}

/**
 * 拷贝文件夹
 * @param {string} _src 源路径
 * @param {string} _dst 输出路径
 */
function copyDir(_src, _dst) {
  return new Promise((resolve, reject) => {
    var count = 0
    clearDir(_dst)
    fs.mkdirSync(_dst)
    readNodeDfs(_src, ({ filePath, isFile }) => {
      let reg = RegExp(pathSlash(_src))
      let newPath = filePath.replace(reg, _dst)
      if (isFile) {
        count++
        copyFile(filePath, newPath).finally(() => {
          count--
          if (count < 1) {
            resolve()
          }
        })
      } else {
        fs.mkdirSync(newPath)
      }
    })
  })
}

/**
 * 写入文件
 * @param {string} writeFilePath
 * @param {any} content
 * @param {string} type
 */
function writeTxt(writeFilePath, content, type = 'w') {
  if (typeof content == 'object') {
    content = JSON.stringify(content, null, '\t')
  }
  return new Promise((resolve, reject) => {
    let writeStream = fs.createWriteStream(writeFilePath, {
      flags: type
    })
    writeStream.write(content)
    writeStream.end(() => {
      resolve()
    })
    writeStream.on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = {
  checkDir, // 检查目录可访问性
  checkIsFile, // 判断是否为文件
  pathSlash, // 路径斜线转换
  readFileSync, // 读取文件
  readNodeDfs, // 深度优先遍历文件树
  clearDir, // 删除文件夹
  rename, // 修改文件名
  copyFile, // 拷贝文件
  copyDir, // 拷贝文件夹
  writeTxt // 写入文件
}
