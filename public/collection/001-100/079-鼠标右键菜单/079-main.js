var $forRight = $('#testRight')

$forRight.hide()
document.onclick = function () {
  $forRight.hide()
}

$('.content li').on('contextmenu', function (event) {
  console.log($(this).attr('data-id'), '-->>> id')
  var event = event || window.event
  $forRight.show()
  $forRight.css({
    left: event.clientX + 'px',
    top: event.clientY + 'px'
  })
  return false // 返回false 屏蔽默认右键菜单
})

$forRight.find('li').on('click', function (e) {
  e.stopPropagation()
  e.preventDefault()
  console.log(678, '-->>> 678')
})
