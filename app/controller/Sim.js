const { BaseController } = require('../Base')
let list = []
/**
 * sim
 */
class Sim extends BaseController {
  async setData(ctx) {
    const ip = ctx.request.ip.split(':').slice(-1)[0]
    const time = this.tools.jcore.parseTime(new Date())
    list.push({ ip, time, userAgent: ctx.request.body.userAgent })
    if (list.length > 100) {
      list.shift()
    }
    ctx.body = `Hello: ${ip}`
  }
  getData(ctx) {
    ctx.body = list
  }
  clearData() {
    list = []
    ctx.body = 1
  }
}

module.exports = new Sim()
