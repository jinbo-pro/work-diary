const fs = require('fs')
const path = require('path')
const tools = require('./utils/tools')
const { publicPath } = require('./config')

/**
 * 基础类
 */
class Base {
  constructor() {
    this.fs = fs
    this.path = path
    this.tools = tools
    // 服务器地址
    this.serverPath = `http://${tools.getIPAddress()}:39006`
  }
  // 获取根路径
  getSrcPath(dir) {
    return path.join(publicPath, dir)
  }
}

/**
 * Controller 基础类
 */
class BaseController extends Base {
  constructor() {
    super()
    this.name = 'Controller'
    this.servers = require('./server')
  }
  // 返回成功
  resSuccess(data) {
    return tools.resSuccess(data)
  }
  // 返回失败
  resError(message, code) {
    return tools.resError(message, code)
  }
}

/**
 * Server 基础类
 */
class BaseServer extends Base {
  constructor() {
    super()
    this.name = 'Server'
  }
}

module.exports = {
  Base,
  BaseServer,
  BaseController
}
