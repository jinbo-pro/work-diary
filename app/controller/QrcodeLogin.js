const { BaseController } = require('../Base')

class QrcodeLogin extends BaseController {
  constructor() {
    super()
    // 模拟 数据库 用户
    this.userList = [
      { name: '张三', password: 'zs-111222' },
      { name: '李四', password: 'ls-321654' },
      { name: '汤姆', password: 'tm-123456' },
      { name: '鲍勃', password: 'bb-654987' }
    ]
    // 模拟 redis 已登录的账户列表
    this.overLoginList = []
  }
  // 检验当前 guid 是否已登录
  async checkLogin(ctx) {
    const tempGuid = ctx.query.tempGuid // 浏览器二维码临时 guid
    if (!tempGuid) return (ctx.body = this.resError('guid不能为空'))
    let user = this.overLoginList.find((item) => item.tempGuid == tempGuid)
    ctx.body = this.resSuccess(user || null)
  }
  // 关联 guid 和账号， 实现扫码登录
  async relationAccount(ctx) {
    const userName = ctx.query.userName
    const tempGuid = ctx.query.tempGuid
    if (!userName) return (ctx.body = this.resError('用户名不能为空'))
    if (!tempGuid) return (ctx.body = this.resError('guid不能为空'))
    let loginUser = this.overLoginList.find((item) => item.tempGuid == tempGuid)
    if (loginUser) {
      return (ctx.body = this.resSuccess({
        type: 1,
        userInfo: loginUser.userInfo
      }))
    }
    let userInfo = this.userList.find((item) => item.name == userName)
    if (!userInfo) return (ctx.body = this.resError('账户不存在'))
    let addUser = { tempGuid, userInfo }
    this.overLoginList.push(addUser)
    ctx.body = this.resSuccess({ type: 0, userInfo: addUser.userInfo })
  }
}

module.exports = new QrcodeLogin()
