const fs = require('fs')
const path = require('path')

/**
 * 返回
 * @param {http.ServerResponse<http.IncomingMessage>} res
 * @param {string} type
 * @param {any} content
 */
function responseHandle(res, type, content) {
  if (typeof content == 'object') {
    content = JSON.stringify(content)
  }
  res.setHeader('Content-Type', type)
  res.write(content)
  res.end()
}
/**
 * 解析post body
 * @param {http.IncomingMessage} req
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let postdata = ''
    req.on('data', function (chunk) {
      postdata += chunk
    })
    req.on('end', function () {
      resolve(postdata)
    })
    req.on('error', reject)
  })
}
/**
 * 解析字符串
 * @param {string} str
 */
function parseStrToJson(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.log(error, 'json 解析失败')
    return null
  }
}
/**
 * 读取文件
 * @param {string} filePath
 * @param {boolean} isBinary
 * @returns
 */
function readFile(filePath, isBinary) {
  const url = path.resolve(__dirname, `./view/${filePath}`)
  return isBinary ? fs.readFileSync(url, 'binary') : fs.readFileSync(url).toString()
}
/**
 * 检查文件可访问性
 * @param {string} dst
 * @returns
 */
function checkDir(dst) {
  return new Promise((resolve, reject) => {
    fs.access(dst, (err) => (err ? resolve(false) : resolve(true)))
  })
}

module.exports = {
  responseHandle,
  parseStrToJson,
  parseBody,
  readFile,
  checkDir
}
