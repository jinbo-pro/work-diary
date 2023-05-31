import { SlideHandle } from '@/utils/module/SlideHandle.js'
console.log('118-鼠标-触摸滑动事件整理')

/**
 * SlideHandle
 */

function tips(msg) {
  document.getElementById('tips').innerText = msg
}

for (let i = 1; i <= 3; i++) {
  new SlideHandle({
    el: document.getElementById(`app${i}`),
    moveStart: (x, y) => {
      tips(`x: ${x}  y: ${y}  [ ${i} ] moveStart`)
    },
    move: (x, y) => {
      tips(`x: ${x}  y: ${y}  [ ${i} ] move`)
    },
    moveEnd: (x, y) => {
      tips(`x: ${x}  y: ${y}  [ ${i} ] moveEnd`)
    }
  })
}
