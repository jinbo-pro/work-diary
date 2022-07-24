// 初始
const CountUp = countUp.CountUp
var $start = $('input[name=start]')
var $end = $('input[name=end]')
var $duration = $('input[name=duration]')

var getStartVal = () => +$start.val()
var getEndVal = () => +$end.val()
var getDurationVal = () => +$duration.val()
$('.content').text(getStartVal())

// dom 事件
$start.on('input', function () {
  $('.content').text($(this).val())
})
$('#active').on('click', activeCount)
$('#clickAdd').on('click', () => {
  let endNum = getEndVal()
  $start.val(endNum)
  $end.val(endNum + 100)
  activeCount()
})
$('#reset').on('click', () => {
  $start.val(1)
  $end.val(500)
  $('.content').text(1)
})

// 执行方法
function activeCount() {
  c1_setTime()
  c2_animationFrame()
  c3_countUp()
}

// 增长曲线 摘自 CountUp.js
function easeOutExpo(t, b, c, d) {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

// 判断数据是否超出
function isoverflow(currentNum, endVal, countDown) {
  currentNum = Math.ceil(currentNum)
  if (countDown && currentNum <= endVal) return endVal
  if (!countDown && currentNum >= endVal) return endVal
  return currentNum
}

/**
 * 1 定时器方式
 */
function c1_setTime() {
  var dom = $('#setTime')
  var startVal = getStartVal()
  var endVal = getEndVal()
  if (startVal == endVal) return
  const F = 1000 / 60 // 运动帧率 60 帧
  var duration = getDurationVal()
  var address = Math.abs(endVal - startVal)
  var countDown = startVal > endVal
  var currentNum = +dom.text()
  var progress = 0

  var time = setInterval(() => {
    if (currentNum == endVal) {
      clearInterval(time)
      time = null
    } else {
      if (countDown) {
        currentNum = startVal - easeOutExpo(progress, 0, address, duration)
      } else {
        currentNum = easeOutExpo(progress, startVal, address, duration)
      }
      progress += F
      currentNum = isoverflow(currentNum, endVal, countDown)
      dom.text(currentNum)
    }
  }, F)
}

/**
 * 2 animationFrame 方式
 */
function c2_animationFrame() {
  var dom = $('#animationFrame')
  var startVal = getStartVal()
  var endVal = getEndVal()
  if (startVal == endVal) return
  const F = 1000 / 60 // 运动帧率 60 帧
  var duration = getDurationVal()
  var address = Math.abs(endVal - startVal)
  var countDown = startVal > endVal
  var currentNum = +dom.text()
  var progress = 0
  var rafId = null
  function animloop() {
    rafId = requestAnimationFrame(animloop)
    if (currentNum == endVal) {
      cancelAnimationFrame(rafId)
      rafId = null
    } else {
      if (countDown) {
        currentNum = startVal - easeOutExpo(progress, 0, address, duration)
      } else {
        currentNum = easeOutExpo(progress, startVal, address, duration)
      }
      progress += F
      currentNum = isoverflow(currentNum, endVal, countDown)
      dom.text(currentNum)
    }
  }
  animloop()
}

/**
 * 3 使用 CountUp 插件
 */
function c3_countUp() {
  const myCountUp = new CountUp('myTargetElement', getEndVal(), {
    startVal: getStartVal(),
    duration: getDurationVal() / 1000
  })
  if (!myCountUp.error) {
    myCountUp.start()
  } else {
    console.error(myCountUp.error)
  }
}
