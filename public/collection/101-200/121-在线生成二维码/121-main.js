console.log('121-在线生成二维码')

// 生成二维码
const $save = $('#save')
const $qrcode = $('#qrcode')
const $content = $('#text-content')
const $txtCount = $('.cur-words')
const $createQrcode = $('#createQrcode')

var code = null
// 生成二维码
$createQrcode.on('click', function () {
  if (code) {
    code.clear()
  }
  $qrcode.text('')
  var content = $content.val()
  if (content) {
    code = new QRCode(document.getElementById('qrcode'), content)
  } else {
    $qrcode.text('没有内容')
  }
})
// 输入数量统计
$content.on('input', function () {
  var len = $(this).val().length
  if (len) {
    $txtCount.text(len).parent().show()
  } else {
    $qrcode.text('')
    $txtCount.parent().hide()
  }
})
// 保存二维码
$save.on('click', function () {
  let qrCanvas = $('#qrcode canvas')
  if (!qrCanvas.length) {
    return $qrcode.text('未生成二维码')
  }
  let a = document.createElement('a')
  a.href = qrCanvas[0].toDataURL('image/png')
  a.download = '二维码'
  a.click()
  console.log('下载成功')
})
