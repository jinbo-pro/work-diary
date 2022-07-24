// document.body.addEventListener('touchstart', function (e) {
//     e.preventDefault();//手指滑动时，浏览器会上下左右翻屏，
// });
var oCanvas = document.getElementById('canvas')
oCanvas.width = document.body.clientWidth
oCanvas.height = document.body.clientHeight
var cxt = oCanvas.getContext('2d')
cxt.lineWidth = 2
var posX = 0 //x坐标
var posY = 0 //y坐标
//手指触摸屏幕可是记录此时的位置作为起点
oCanvas.addEventListener('touchstart', function (e) {
  posX = e.changedTouches[0].clientX
  posY = e.changedTouches[0].clientY
  cxt.moveTo(posX, posY)
})
//手指屏幕滑动画线
oCanvas.addEventListener('touchmove', function (e) {
  posX = e.changedTouches[0].clientX
  posY = e.changedTouches[0].clientY
  cxt.lineTo(posX, posY)
  cxt.stroke()
})
