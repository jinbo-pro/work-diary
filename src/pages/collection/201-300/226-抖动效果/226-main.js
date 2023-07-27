$('.btn1').on('click', function () {
  const box = $(this).next()
  box.addClass('shake ')
  setTimeout(() => {
    box.removeClass('shake ')
  }, 300)
})

$('.btn2').on('click', function () {
  const box = $(this).next()
  const intShakes = 2 // 初始抖动值
  const intDistance = 5 // 抖动距离
  const intDuration = 400 // 抖动时间
  box.css({ position: 'relative' })
  for (var x = 1; x <= intShakes; x++) {
    let t = intDuration / intShakes
    box
      .animate({ left: intDistance * -1 }, t / 4)
      .animate({ left: intDistance }, t / 2)
      .animate({ left: 0 }, t / 4)
  }
})
