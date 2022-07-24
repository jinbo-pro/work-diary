/**
 * 生成全局唯一标识符 guid
 * @param {string} head 是否添加guid头
 * @returns string
 */
function guid(head) {
  const S = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  // 因为第一个字符为数值时,该 guid 不能用作 id 或者 class 所以前面加个 guid 前缀
  return `${
    head ? head : ''
  }${S()}${S()}-${S()}-${S()}-${S()}-${S()}${S()}${S()}`
}

// 生成二维码
let tempGuid = guid()
let appUrl =
  location.href.replace('index.html', 'app.html') + '?tempGuid=' + tempGuid
console.log(appUrl, '-->>> appUrl')
$('#appUrl').text(appUrl)
new QRCode(document.getElementById('qrcode'), appUrl)

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
