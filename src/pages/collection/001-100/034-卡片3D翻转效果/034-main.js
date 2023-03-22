/**
 * 图片来源 https://hs.blizzard.cn/
 */
const cardImgList = [
  'https://hearthstone.nosdn.127.net/hearthstone/fa30979680779774cd2e9c5d900a71911f6cc6151a995c99df885445972da911.png',
  'https://hearthstone.nosdn.127.net/hearthstone/ed7583c084a5f6785487098a718653ad9cbfe35223ac7eccf9512d4031e02e3b.png',
  'https://hearthstone.nosdn.127.net/hearthstone/64a38129cd69032fcd5080b3973e1f2cc50595831c5e82bb51ed30b2cc932041.png',
  'https://hearthstone.nosdn.127.net/hearthstone/23a1f967e0fe5e75048d95e363720d83a7f7019b2ad92c19175209aab87993e8.png',
  'https://hearthstone.nosdn.127.net/hearthstone/22a4c9e55f3c023fb2591fc875d91ae0559363285c24b0ea2633ed07a44a5780.png',
  'https://hearthstone.nosdn.127.net/hearthstone/992a5d7640b1f4f2e42895853fb0de70b144d52f10b3f0ebb883b1e9394d92df.png',
  'https://hearthstone.nosdn.127.net/hearthstone/31ac12a69c60d594c16fd3d11abf408ac28449803d5682974ca289fdb0fc689e.png',
  'https://hearthstone.nosdn.127.net/hearthstone/39937ef0c2b63315d21c386890d7aa4bc48dbd568ff319bbd43a30e709eb93ba.png'
]

for (let item of cardImgList) {
  $('.content').append(`<div class="box"><img class="card" src="${item}"></div>`)
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
