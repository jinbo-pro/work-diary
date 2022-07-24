console.log('100-图片滑动验证效果')

function randomNum(max, min = 0) {
  return ~~(Math.random() * max + min)
}
const boxDom = $('.box')
const blockW = 50
const maxW = boxDom.width()
const maxH = boxDom.height()
function randomPoint() {
  let left = randomNum(maxW - blockW * 2, blockW)
  let top = randomNum(maxH - blockW)
  $('.empty_box').css({ left: left + 'px', top: top + 'px' })
  $('.slider_top').css({ top: top + 'px' })
  return { left, top }
}

function tips(msg, time = 1200) {
  $('#tips').show().text(msg)
  setTimeout(() => {
    $('#tips').hide()
  }, time)
}

const { left } = randomPoint()

const slider = $('.slider_block')
const sliderTop = $('.slider_top')
let iv = 0 // 鼠标位置与 dom 左上角的 x 轴偏移
let blockLeft = 0

/**位置验证 */
function validBlockPoint() {
  console.log(left, blockLeft, '-->>> left, blockLeft')
  if (Math.abs(left - blockLeft) < 5) {
    tips('验证成功 success')
  } else {
    tips('验证失败 fail')
    slider.css({ left: 0 })
    sliderTop.css({ left: 0 })
  }
}

/**鼠标移动同步滑块位置 */
slider.on('mousedown', function (e) {
  const l = slider.offset().left
  lv = e.pageX - l
  document.onmousemove = function (event) {
    var end = event.clientX
    let left = end - lv
    if (left <= 0 || left >= maxW - blockW) return
    blockLeft = left
    slider.css({ left: left + 'px' })
    sliderTop.css({ left: left + 'px' })
  }
  document.onmouseup = function () {
    validBlockPoint()
    document.onmousemove = null
    document.onmouseup = null
  }
})
