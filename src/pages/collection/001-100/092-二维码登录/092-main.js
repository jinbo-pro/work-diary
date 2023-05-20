import { guid } from '@/utils/easyHash.js'

// 生成二维码
let tempGuid = guid()
let appUrl = location.href.replace('index.html', 'app.html') + '?tempGuid=' + tempGuid
console.log(appUrl, '-->>> appUrl')
$('#appUrl').text(appUrl)
QRCode.toCanvas(document.getElementById('qrcode'), appUrl, function (error) {
  if (error) {
    console.log(error)
  } else {
    console.log('ok')
  }
})

// 开始轮询接口 查看是否登录成功
var setTime = setInterval(() => {
  checkLogin(tempGuid)
}, 800)

function checkLogin(tempGuid) {
  if (!setTime) return
  $.ajax({
    url: '/qrcode/checkLogin',
    data: { tempGuid },
    timeout: 1200,
    success: function (res) {
      if (res.code) {
        return console.log(res.message)
      }
      if (!res.data) return console.log(0)
      const user = res.data.userInfo
      if (user) {
        $('.login').hide()
        $('.home').show()
        $('.user').text(user.name)
        $('.password').text(user.password)
        clearInterval(setTime)
        setTime = null
      }
    },
    error: function (err) {
      alert('服务器异常')
      setTime = null
    }
  })
}
