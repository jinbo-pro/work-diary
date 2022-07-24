//音乐自动播放
$(document).ready(function () {
  // 显示浏览器信息
  var browser = $.browser
  var browser2 = window.navigator.userAgent
  $('#browser').text(JSON.stringify(browser))
  $('#browser2').text(browser2)

  audioAutoPlay()
})

// pc浏览器播放
function audioAutoPlay() {
  var audio = document.getElementById('music')
  audio.play()
}

// 解决微信自动播放
document.addEventListener('DOMContentLoaded', function () {
  function audioAutoPlay() {
    var audio = document.getElementById('music')
    audio.play()
    document.addEventListener(
      'WeixinJSBridgeReady',
      function () {
        audio.play()
      },
      false
    )
  }
  audioAutoPlay()
})
// 解决Ios 自动播放
function musicInBrowserHandler() {
  var media = document.querySelector('#music')
  media.play()
  $('#browser3').text('你滑动了+++')
  $('body').unbind('touchstart', musicInBrowserHandler)
}
$('body').on('touchstart', musicInBrowserHandler)
