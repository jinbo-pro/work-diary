const { BaseController } = require('../Base')

const redis = new Map() // 模拟redis，用于存储登录信息 {key:token,value:userId}

class Login extends BaseController {
  /**登录 cookie 操作 */
  login(ctx) {
    const { userName, password } = ctx.request.body
    // 模拟查询数据库
    if (userName && password) {
      const token = this.tools.guid()
      redis.set(token, userName)
      ctx.cookies.set('token', token, {
        maxAge: 15000 // cookie过期时间： 这里方便测试设置为 15s 过期
      })
      ctx.body = this.resSuccess('登录成功跳转')
    } else {
      ctx.body = this.resError('用户名或密码不正确')
    }
  }
  /**鉴权获取 cookie */
  checkAuth(ctx) {
    const token = ctx.cookies.get('token')
    if (token && redis.has(token)) {
      ctx.body = this.resSuccess(redis.get(token))
    } else if (redis.has(token)) {
      ctx.body = this.resError('登录失效请重新登陆')
    } else {
      ctx.body = this.resError('用户未登录')
    }
  }
  /**退出登录 */
  exitLogin(ctx) {
    const token = ctx.cookies.get('token')
    if (token) {
      redis.delete(token)
    }
    ctx.body = this.resSuccess('退出成功')
  }
}

module.exports = new Login()
