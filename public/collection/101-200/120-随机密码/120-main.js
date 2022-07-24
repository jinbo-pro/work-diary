import { randomString } from '/utils/easyHash.js'
import { parseTime } from '/utils/time.js'
import { copyText } from '/utils/page.js'

console.log('120-随机密码')

/**
 * dom 获取
 */
// 选择按钮
var clickBut = document.getElementsByTagName('input')
// 结果输出
var resultText = document.getElementById('result-text')
// 历史记录
var createdHistory = document.getElementById('createdHistory')
// 弹窗
var dialog = document.getElementById('dialog')
// 历史记录列表
var localList = localStorage.getItem('historyList')
var historyList = localList ? JSON.parse(localList) : []
renderHistoryList()

/**
 * 功能实现
 */
// 显示弹窗
function showDialog(content) {
  dialog.style.display = 'flex'
  dialog.innerHTML = content
  setTimeout(() => {
    dialog.style.display = 'none'
  }, 1200)
}
// 创建密码
function createPassword() {
  var selectfrom = document.selectfrom.elements
  var gradeform = document.gradeform.elements
  var len = selectfrom.length
  var num = '0'
  for (var i = 0; i < len; i++) {
    if (selectfrom[i].checked) {
      num = selectfrom[i].value
    }
  }
  if (num == 0) {
    if (!/^\d+$/.test(selectfrom[len - 1].value)) {
      showDialog('请输入正确的位数')
      selectfrom[len - 1].value = '32'
      return
    }
    num = selectfrom[len - 1].value
  }
  var types = []
  ;[].forEach.call(gradeform, (item) => {
    if (item.checked) {
      types.push(item.value)
    }
  })
  if (!types.length) {
    return showDialog('至少选中一种类型')
  }
  var content = randomString(+num, types)
  resultText.innerText = content
  resultText.classList.remove('copy-text')
}
// 添加历史
function addHistory(content) {
  if (historyList.length > 10) {
    historyList.pop()
  }
  historyList.unshift({ content, time: parseTime() })
  renderHistoryList()
}
// 渲染历史记录列表
function renderHistoryList() {
  createdHistory.innerHTML = ''
  for (let item of historyList) {
    var li = document.createElement('li')
    li.classList.add('history-item')
    li.innerHTML = `<span>${item.content}</span><span class="time_box">${item.time}</span>`
    li.onclick = function () {
      copyText(item.content)
      showDialog('已复制内容到剪贴板')
    }
    createdHistory.appendChild(li)
  }
  localStorage.setItem('historyList', JSON.stringify(historyList))
}
// 复制输出结果
function copyResult() {
  var text = resultText.innerText.trim()
  if (!text) return
  copyText(text)
  addHistory(text)
  showDialog('已复制内容到剪贴板')
  resultText.classList.add('copy-text')
}
// 添加点击事件
window.onload = createPassword
for (let i = 0; i < clickBut.length; i++) {
  let item = clickBut[i]
  if (item.type === 'radio' || item.type == 'checkbox') {
    item.onclick = createPassword
  }
}
document.getElementById('create').onclick = createPassword
document.getElementById('copy').onclick = copyResult
