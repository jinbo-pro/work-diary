const { BaseController } = require('../Base')
let list = []
/**
 * sim
 */
class Sim extends BaseController {
  async setData(ctx) {
    const ip = ctx.request.ip.split(':').slice(-1)[0]
    const time = this.tools.jcore.parseTime(new Date())
    list.push({ ip, time })
    if (list.length > 100) {
      list.shift()
    }
    ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>测试页面</title>
      </head>
      <body>
        <h3>今日壁纸</h3>
        <img style="max-width: 100%" src="https://api.isoyu.com/bing_images.php" alt="图片加载失败" />
      </body>
    </html>
    `
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
