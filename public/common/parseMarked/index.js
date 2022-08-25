import { getQueryObject } from '/utils/page.js'
const renderer = new marked.Renderer()
const options = {
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    const s = hljs.highlightAuto(code).value
    const n = hljs.lineNumbersValue(s)
    return n
  }
}
function parseMarked(data) {
  return marked.parse(data, options)
}
/**解析导航栏 */
function parseNavTab() {
  const tags = []
  const content = document.getElementById('content')
  for (let e of content.children) {
    if (/^H[1-3]/.test(e.nodeName)) {
      tags.push({
        id: e.id,
        nodeName: e.nodeName
      })
    }
  }
  let html = ''
  for (let item of tags) {
    html += `
    <div class="tag_${item.nodeName}">
      <a href="#${item.id}">
        <p>${item.id}</p>
      </a>
    </div>
    `
  }
  document.getElementById('nav').innerHTML = html
}

window.onload = async function () {
  let filePath = getQueryObject().filePath
  if (!filePath) {
    document.body.innerHTML = '文件不存在'
    return
  }
  const response = await fetch(filePath)
  if (!response.ok) return null
  const res = await response.text()
  if (!res) return null
  const content = document.getElementById('content')
  content.innerHTML = parseMarked(res)
  parseNavTab()
}
