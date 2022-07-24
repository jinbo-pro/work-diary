/**
 * 此事件类似于小程序的 onShow 和 onHide
 * uni-app H5端的 onShow 和 onHide 事件也是通过此方法实现
 */

document.addEventListener('visibilitychange', function () {
  console.log(document.visibilityState)
  //页面显示时document.visibilityState值为visible，隐藏显示时document.visibilityState值为hidden，
  //或者
  document.title = document.hidden ? '离开这个页面了' : '又回到这个页面了'
  //这个是判断document.hidden，页面的隐藏状态
})
