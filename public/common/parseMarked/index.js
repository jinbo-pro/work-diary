import { getQueryObject } from '/utils/page.js'
const options = {
  // marked 配置参考: https://marked.js.org/using_advanced
  renderer: new marked.Renderer(),
  highlight: function (code) {
    const s = hljs.highlightAuto(code).value
    const n = hljs.lineNumbersValue(s)
    return n
  }
}

window.onload = async function () {
  const filePath = getQueryObject().filePath
  if (!filePath) {
    document.body.innerHTML = '<p> filePath 不存在</p>'
    return
  }
  const response = await fetch(filePath)
  if (!response.ok) return null
  const res = await response.text()
  if (!res) return null
  const content = document.getElementById('content')
  content.innerHTML = marked.parse(res, options)
  /**解析导航栏 */
  const tags = Array.from(content.children).filter((e) => /^H[1-3]/.test(e.nodeName))
  const navDom = document.getElementById('nav')
  if (!tags.length) {
    navDom.style.display = 'none'
    content.style.width = '100%'
    return
  }
  navDom.innerHTML = tags.reduce((p, c) => {
    p += `<div class="tag_${c.nodeName}">
            <a href="#${c.id}"><p>${c.id}</p></a>
          </div>`
    return p
  }, '')
}
