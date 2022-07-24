var xhr = new XMLHttpRequest()
// 获取列表
function getList() {
  xhr.open('get', 'http://localhost:8899/api/listData')
  // 设置请求头
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  // 监听请求变化
  xhr.onreadystatechange = function (res) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.response, '-->>> xhr.response')
    }
  }
  // xhr 超时设置
  xhr.timeout = 1000
  xhr.ontimeout = function (res) {
    console.log(res, '-->>> 请求超时了')
  }
  // 请求结束
  xhr.onloadend = (e) => {
    console.log('request loadend')
  }
  // 请求出错
  xhr.onerror = (e) => {
    console.log('request error')
  }
  xhr.send()
}

var selectFile = document.getElementById('selectFile')
selectFile.onchange = function (e) {
  console.log(e.target.files, '-->>> files')
  updateFile(e.target.files)
}
// 进度条显示
function updateProgress(event) {
  if (event.lengthComputable) {
    var percentComplete = event.loaded / event.total
    console.log(percentComplete, '-->>> percentComplete')
  }
}
// 上传文件
function updateFile(files) {
  var form = new FormData()
  for (var i = 0; i < files.length; i++) {
    form.append('file', files[i])
  }
  xhr.open('post', 'http://localhost:8899/fileUpload')
  xhr.onreadystatechange = function (res) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.response, '-->>> xhr.response')
    }
  }
  // 设置进度条
  xhr.onprogress = updateProgress
  xhr.upload.onprogress = updateProgress
  xhr.send(form)
}
