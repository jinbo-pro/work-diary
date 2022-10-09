/**
 * 【audio标签的属性】
 *	loop		设置循环播放
 *	controls 	浏览器自带控件样式
 *	autoplay	设置音频在加载完后立即播放
 *
 *	直接设置自动播放属性【autoplay】 		pc端有效，微信浏览器有些有效有些无效  Ios无效，Android无效
 *	控制自动播放背景音乐【再添加初始化事件】 pc端有效，微信浏览器有效  Ios无效，Android无效
 *	控制自动播放背景音乐【再添加滑动事件】 pc端有效，微信浏览器有效  Ios有效，Android无效
 */

// 音乐自动播放
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
