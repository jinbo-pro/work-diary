$('#openDialog').on('click', function () {
  $('.mask').show()
  stopMove()
})
$('.mask').on('click', function () {
  $(this).hide()
  canMove()
})
$('.container').on('click', function (e) {
  e.stopPropagation()
})

for (let i = 0; i < 30; i++) {
  $('#list').append(`<li>A 第 ${i + 1} 条内容</li>`)
  $('#list2').append(`<li>B 第 ${i + 1} 条内容</li>`)
  $('#docList').append(`<p>撑起页面内容_${i + 1} 使其出现滚动条 _ ${Math.random()}</p>`)
}

/*
    scrollingElement可兼容地获取scrollTop和scrollHeight
    document.scrollingElement.scrollHeight
    可完美代替曾经的document.documentElement.scrollHeight || document.body.scrollHeight
*/

// 阻止滚动穿透
function stopMove() {
  const scrollTop = document.scrollingElement.scrollTop
  document.body.classList.add('static')
  document.body.style.top = `-${scrollTop}px`
}

// 开启滚动穿透
function canMove() {
  document.body.classList.remove('static')
  // 关闭弹窗后同步body滚动条位置
  document.scrollingElement.scrollTop = Math.abs(parseInt(document.body.style.top))
  document.body.style.top = ''
}
