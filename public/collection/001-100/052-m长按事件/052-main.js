/**
 * 移动端元素长按方法
 * @param {HTMLElement} dom 元素
 * @param {function} fn 回调
 * @param {number} time 执行间隔
 * @returns
 */
function addLongPress(dom, fn, time = 300) {
  if (!dom) return console.log('没有元素')
  if (!fn) return console.log('没有回调方法')
  var timeOutEvent = null
  dom.ontouchstart = function (e) {
    timeOutEvent = setInterval(() => {
      fn(e)
    }, time)
    e.preventDefault()
  }
  dom.ontouchmove = function (e) {
    if (e.cancelable) {
      timeOutEvent && clearTimeout(timeOutEvent)
      timeOutEvent = null
    }
  }
  dom.ontouchend = function (e) {
    timeOutEvent && clearTimeout(timeOutEvent)
    timeOutEvent = null
    return false
  }
}

function longPress(e) {
  console.log(e, '-->>> touchArea')
}

var touchArea = document.getElementById('touchArea')
addLongPress(touchArea, longPress)
