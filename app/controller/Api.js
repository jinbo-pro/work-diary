const { BaseController } = require('../Base')

class Api extends BaseController {
  // mockjs测试列表 - get
  listData(ctx) {
    const res = this.servers.MockData.listData(ctx.query.count)
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
}

module.exports = new Api()
