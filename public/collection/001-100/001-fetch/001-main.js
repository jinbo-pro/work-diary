const app = document.getElementById('app')
const tips = document.getElementById('tips')
function resHandel(msg) {
  tips.innerHTML = msg
}

async function request() {
  const response = await fetch('/api/listData', {
    method: 'get'
  })
  /**
   * 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，
   * 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve
   * （如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false ），
   * 仅当网络故障时或请求被阻止时，才会标记为 reject。
   */
  if (response.ok) {
    const res = await response.json() // 如果返回的是文本就用 response.text() 解析 
    return res
  } else {
    resHandel('请求异常')
    return null
  }
}

request()
  .then((res) => {
    console.log(res, '-->>> res')
    resHandel('请求成功')
    for (let item of res.data) {
      let li = document.createElement('li')
      li.innerHTML = `name: ${item.cname} province: ${item.province} city: ${item.city} county: ${item.county}`
      app.append(li)
    }
  })
  .catch((err) => {
    console.log('服务器异常 尝试请求静态资源')
    getStaticData()
  })

async function getStaticData() {
  const response = await fetch('/mockData/home_fileList.json', {
    method: 'get'
  })
  resHandel('请求成功')
  const res = await response.json()
  app.innerHTML = res.data.reduce((p, c) => {
    p += `<li>${c.id}--${c.fileName}</li>`
    return p
  }, '')
}
