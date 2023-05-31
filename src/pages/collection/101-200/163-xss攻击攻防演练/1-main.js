import { local } from '@/utils/storage.js'

const xssList = [
  `<script>console.log("xss 代码...")</script>`,
  `<a href=Javascript:alert(1)>123</a>`,
  `<iframe onload = alert('XSS')>`,
  `<img src="null" onerror="(function (){console.log(1122)})()" />`
]
for (let item of xssList) {
  const li = $('<li></li>')
  li.text(item)
  $('#xsscode').append(li)
}

let list = local.get('list') || []

function getList() {
  // 模拟读取数据库数据
  list = local.get('list') || []
  // 渲染列表
  const html = list.reduce((p, c) => {
    p += `<li>${c}</li>`
    return p
  }, '')
  $('#list').html(html)
}

getList()

$('#addSubmit').on('click', function () {
  const content = $('#content').val()
  if (!content) {
    return alert('内容不能为空')
  }
  list.push(content)

  // 模拟数据库存储
  local.set('list', list)

  // 刷新列表
  getList()

  $('#content').val('')
})
