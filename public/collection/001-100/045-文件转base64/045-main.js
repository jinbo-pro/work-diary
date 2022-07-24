// base64/buffer 解析
function fileParse(file, type = 'base64') {
  return new Promise((resolve) => {
    let fileRead = new FileReader()
    if (type === 'base64') {
      fileRead.readAsDataURL(file)
    } else if (type === 'buffer') {
      fileRead.readAsArrayBuffer(file)
    }
    fileRead.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}

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

var copy = document.getElementById('copy')
var result = document.getElementById('result')
var selectFile = document.getElementById('selectFile')
selectFile.onchange = function (e) {
  var files = e.target.files
  var file = files[0]
  fileParse(file).then((res) => {
    console.log(res, '-->>> res')
    result.innerHTML = res
  })
}

copy.onclick = function () {
  var text = result.innerHTML
  copyText(text)
  alert('复制成功')
}
