const { BaseController } = require('../Base')

class Api extends BaseController {
  // mockjs测试列表 - get
  async listData(ctx) {
    const res = this.servers.MockData.listData(ctx.query.count)
    if (ctx.query.sleep) {
      await this.tools.sleep(Number(ctx.query.sleep))
    }
    ctx.body = this.resSuccess(res)
  }
  // mockjs测试列表 - post
  userListData(ctx) {
    const res = this.servers.MockData.userList(ctx.request.body.pageSize)
    ctx.body = this.resSuccess(res)
  }
  // JSONP 请求处理
  jsonp(ctx) {
    const query = ctx.query
    const result = this.resSuccess({ time: Date.now(), query })
    ctx.body = `jsonpCallBackMap.${query.callback}(${JSON.stringify(result)})`
  }
  // sendBeacon 无阻塞发送统计数据
  sendBeacon(ctx) {
    const files = ctx.request.files
    let result = null
    if (files) {
      result = `filesize: ${files.file.size}`
    } else if (ctx.request.body) {
      result = `body: ${ctx.request.body}`
    }
    ctx.body = this.resSuccess(result)
  }
}

module.exports = new Api()
