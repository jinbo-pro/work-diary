const os = require('os')
const file = require('./file')
const jcore = require('./jcore')
const crypto = require('./crypto')

/**
 * 获取 本机 ip 地址
 */
function getIPAddress() {
  var interfaces = os.networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
/**
 * 生成全局唯一标识符 guid
 */
function guid() {
  const S = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return `guid${S()}${S()}-${S()}-${S()}-${S()}-${S()}${S()}${S()}`
}
/**
 * 校验
 * @param {object} obj
 * @param {array} valiList
 * @returns {(boolean|object)}
 */
function validate(obj, valiList) {
  for (let item of valiList) {
    if (!obj[item.name]) {
      return item.msg
    }
  }
  return false
}
/**
 * 接口延时测试
 * @param {number} time 延时时间
 */
function sleep(time = 1200) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
/**
 * 返回成功
 * @param {any} data
 * @returns
 */
function resSuccess(data) {
  return {
    code: 0,
    data,
    message: '操作成功!'
  }
}
/**
 * 返回失败
 * @param {string} message
 * @param {number} code
 * @returns
 */
function resError(message, code = 100) {
  return { code, message }
}
/**
 * 获取token
 * @param {object} ctx
 * @returns token
 */
function getToken(ctx) {
  let tokenArrary = ctx.request.headers['token'].split(' ')
  let token = tokenArrary[tokenArrary.length - 1]
  return token
}
/**
 * 获取控制台参数
 * @returns
 */
function getArguments() {
  let args = process.argv.splice(2)
  if (args && args.length) {
    return args
  } else {
    return []
  }
}

module.exports = {
  guid, // 生成全局唯一标识符 guid
  validate, // 表单字段验证
  sleep, // 接口延时测试
  getIPAddress, // 获取 本机 ip 地址
  resSuccess, // 接口返回成功
  resError, // 接口返回失败
  getToken, // 获取token
  file, // 文件操作相关
  crypto, // 加解密相关
  jcore, // 前端常用方法
  getArguments // 获取控制台参数
}
