const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./app/router')
const staticFiles = require('koa-static')
const tools = require('./app/utils/tools')
const config = require('./config/config.default')
const args = tools.getArguments()

const app = new Koa()
const env = args.includes('-start') ? 'prod' : 'dev'
// 错误捕获
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error)
    ctx.body = { code: 500, msg: '操作异常' }
  }
})
// 一些路由拦截处理
app.use(async (ctx, next) => {
  /**collection 下的 md 文件自动跳转到 md 解析页面 */
  if (ctx.url.endsWith('.md') && !/parseMarked/.test(ctx.url) && !ctx.query.type) {
    const newUrl = `/common/parseMarked/parseMarked.html?filePath=${ctx.url}`
    ctx.redirect(newUrl)
  } else {
    await next()
  }
})
// 日志记录
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  const sendTime = tools.jcore.parseTime(start, '{h}:{i}:{s}')
  if (env == 'dev') {
    const info = `ip: ${ctx.request.ip} [ ${ctx.method} ${ctx.url} ] time: ${sendTime}`
    console.log(info, ms, 'ms')
  }
})
// 设置静态目录
const maxage = env == 'dev' ? 0 : 2 * 60 * 60 * 1000
app.use(
  staticFiles(config.publicPath, {
    // 静态资源浏览器缓存 2 小时
    maxage
  })
)
// 上传设置
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制 200m
    }
  })
)
// 加载路由
app.use(router.routes()).use(router.allowedMethods())
// 404页面
app.use(async (ctx, next) => {
  await next()
  if (parseInt(ctx.status) === 404) {
    ctx.status = 404
    ctx.body = tools.file.readFileSync(config.publicPath + '/assets/errorPage/404.html')
  }
})

// 启动服务器
app.listen(config.port, welcome)
// websockt 服务器
require('./app/websocket/socket')

// 打印欢迎信息
function welcome() {
  console.log('\x1B[33m%s\x1b[0m:', 'work-diary 启动成功')
  console.log(
    `- Local:     http://localhost:${config.port}\n- Network:   http://${tools.getIPAddress()}:${config.port}`
  )
}
