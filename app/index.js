const Koa = require('koa')
const path = require('path')
const router = require('./router')
const range = require('koa-range')
const koaBody = require('koa-body')
const compress = require('koa-compress')
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
// 大文件Content-Range请求处理
app.use(range)
// 支持gzip压缩
app.use(compress({ threshold: 1024 }))
// 设置静态资源浏览器缓存 2 小时
app.use(staticFiles(publicPath, { maxage: env == 'dev' ? 0 : 2 * 60 * 60 * 1000 }))
// 上传设置
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 500 * 1024 * 1024 // 设置上传文件大小最大限制
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
app.listen(port, function () {
  console.log('\x1B[33m%s\x1b[0m:', 'work-diary 启动成功')
  console.log(`- Local:     http://localhost:${port}\n- Network:   http://${tools.getIPAddress()}:${port}`)
})
