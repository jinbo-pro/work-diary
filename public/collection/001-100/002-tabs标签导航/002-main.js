// 填充dom
for (var i = 0; i < 5; i++) {
  var navItem = `<div class="nav_item">${Mock.Random.ctitle(2, 5)}</div>`
  $('.nav_max').append(navItem)
  $('.nav_max_stand').append(navItem)
}

// 设置聚焦条的样式
function setActiveBarColumn(width, offsetLeft) {
  $('.nav_max .active_bar').css({
    width: width + 'px',
    transform: `translateX(${offsetLeft}px)`
  })
}
function setActiveBarRow(height, offsetTop) {
  $('.nav_max_stand .active_bar_stand').css({
    height: height + 'px',
    transform: `translateY(${offsetTop}px)`
  })
}

// 渲染完成选中默认
window.onload = function () {
  // 横向
  $('.nav_max .nav_item')
    .on('click', function () {
      setActiveBarColumn(this.clientWidth, this.offsetLeft)
      $(this).addClass('active').siblings().removeClass('active')
    })
    .first()
    .addClass('active')
  var selectItemCol = $('.nav_max .nav_item')[0]
  setActiveBarColumn(selectItemCol.clientWidth, selectItemCol.offsetLeft)

  // 纵向
  $('.nav_max_stand .nav_item')
    .on('click', function () {
      setActiveBarRow(this.clientHeight, this.offsetTop)
      $(this).addClass('active').siblings().removeClass('active')
    })
    .first()
    .addClass('active')

  var selectItemRow = $('.nav_max_stand .nav_item')[0]
  console.log(selectItemRow.clientHeight, '-->>> selectItemRow')
  setActiveBarRow(selectItemRow.clientHeight, selectItemRow.offsetTop)
}
