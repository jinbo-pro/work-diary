console.log('129-JSONP解决跨域的原理')

import { guid } from '@/utils/easyHash.js'
import { getQueryString } from '@/utils/page.js'

/**
 * 在 window 上定义一个函数容器 用于存放 jsonp 回调函数方便管理
 */
window.jsonpCallBackMap = {}
function jsonp({ url, params, callBack }) {
  const script = document.createElement('script')
  // 1. 为了避免全局污染，使用一个随机函数名
  const cbFnName = `JSONP_${guid()}`
  // 2. 默认 callback 函数为 cbFnName
  script.src = `${url}?${getQueryString({ callback: cbFnName, ...params })}`
  // 3. 保存回调函数，用于接收数据 请求 script 之后会执行该回调函数
  window.jsonpCallBackMap[cbFnName] = function (res) {
    callBack(res)
    // 5. 回调函数执行完毕 则可以释放 jsonpCallBackMap 对应的函数
    jsonpCallBackMap[cbFnName] = null
  }
  document.body.appendChild(script)
  // 4. script 加载完毕则表示请求完成即可释放 dom
  script.onload = function () {
    document.body.removeChild(script)
  }
}

// jsonp 请求
const btn = document.getElementById('btn')
btn.onclick = function () {
  jsonp({
    url: '/api/jsonp',
    params: {
      name: 'tom',
      age: 18
    },
    callBack: function (res) {
      console.log(res)
      document.getElementById('result').innerText = JSON.stringify(res)
    }
  })
}
