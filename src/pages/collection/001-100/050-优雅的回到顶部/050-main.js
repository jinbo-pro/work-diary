import { scrollTo } from '@/utils/module/scrollTo.js'

for (let i = 0; i < 100; i++) {
  $('#ulBox').append(`<li>撑起页面${i}</li>`)
}
$('#toTop1').on('click', function () {
  scrollTo(0, 300)
})
$('#toTop2').on('click', function () {
  newScrollTo()
})

// 方案一：新方案
// 「behavior」：动画过渡效果，默认auto无，可选smooth平滑
// 「inline」：水平方向对齐方式，默认nearest就近对齐，可选start顶部对齐、center中间对齐和end底部对齐
// 「block」：垂直方向对齐方式，默认start顶部对齐，可选center中间对齐、end底部对齐和nearest就近对齐
function newScrollTo() {
  document.body.scrollIntoView({ behavior: 'smooth' })
}

/**
 * scrollTo 老方案
 * 除了代码量多点， 其他都好
 */
