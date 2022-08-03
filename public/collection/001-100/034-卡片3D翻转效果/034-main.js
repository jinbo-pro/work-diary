for (let i = 0; i < 10; i++) {
  $('.content').append('<div class="box"><img class="card" src="./response.png"></div>')
}
let box = $('.box')
let w = box.width()
let h = box.height()
let thr = false
function setStyle(dom, fx, fy) {
  const maxDeg = 25
  const x = (fx / w) * maxDeg
  const y = (fy / h) * maxDeg
  $(dom).css({
    transform: `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale3d(1, 1, 1)`
  })
}
box
  .on('mousemove', function (e) {
    if (thr) return
    thr = true
    let fx = e.offsetX - w / 2
    let fy = h / 2 - e.offsetY
    setStyle(this, fx, fy)
    setTimeout(() => {
      thr = false
    }, 50)
  })
  .on('mouseleave', function () {
    setStyle(this, 0, 0)
  })
