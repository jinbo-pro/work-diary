const { responseHandle, parseBody, parseStrToJson } = require('./utils')

class JRouter {
  constructor() {
    this.middleware = []
  }
  use(method, url, fn) {
    this.middleware.push({ method: method.toLocaleUpperCase(), url, fn })
  }
  get(url, fn) {
    this.use('get', url, fn)
  }
  post(url, fn) {
    this.use('post', url, fn)
  }
  async run(req, res) {
    const { url, method } = req
    const cur = this.middleware.find((e) => e.url === url && e.method == method)
    if (!cur) {
      // 空白页
      responseHandle(res, 'text/html', '<p>404</p>')
      return
    }
    let result = null
    if (method == 'POST') {
      const dataStr = await parseBody(req)
      const postBody = parseStrToJson(dataStr)
      result = cur.fn(req, res, postBody)
    } else {
      result = cur.fn(req, res)
    }
    if (result instanceof Promise) {
      result = await result()
    }
    responseHandle(res, 'application/json', result)
  }
}

module.exports = JRouter
