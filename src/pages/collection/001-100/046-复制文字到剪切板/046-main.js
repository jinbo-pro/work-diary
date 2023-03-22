// 复制文字到剪切板
function copyText(text) {
  if (!text) return
  // 复制借助input实现
  document.execCommand('Copy')
  var inputZ = document.createElement('input')
  inputZ.setAttribute('id', 'inputCopy')
  inputZ.value = text
  document.body.appendChild(inputZ)
  document.getElementById('inputCopy').select()
  document.execCommand('Copy')
  document.body.removeChild(inputZ)
}

var word = document.getElementById('word')
var copy = document.getElementById('copy')

copy.onclick = function () {
  var text = word.value
  copyText(text)
  alert('复制成功')
}

// 复制文字到剪切板
// 方式二: 方便简洁
function copyText2(text) {
  if (!text) return
  navigator.clipboard.writeText(text)
}
