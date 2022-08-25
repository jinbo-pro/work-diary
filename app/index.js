const Koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const router = require('./router')
const staticFiles = require('koa-static')
const tools = require('./utils/tools')
const args = tools.getArguments()

const app = new Koa()
const env = args.includes('-dev') ? 'dev' : 'prod'
const port = 7586
const publicPath = path.join(__dirname, '../public')
// 错误捕获
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error)
    ctx.body = { code: 500, msg: '操作异常' }
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
  staticFiles(publicPath, {
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
    ctx.body = tools.file.readFileSync(publicPath + '/assets/errorPage/404.html')
  }
})

// 启动服务器
app.listen(port, welcome)

// 打印欢迎信息
function welcome() {
  console.log('\x1B[33m%s\x1b[0m:', 'work-diary 启动成功')
  console.log(`- Local:     http://localhost:${port}\n- Network:   http://${tools.getIPAddress()}:${port}`)
}
