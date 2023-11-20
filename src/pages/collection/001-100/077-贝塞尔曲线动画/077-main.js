import { bezier2 } from '@/utils/module/bezier'

console.log('077-贝塞尔曲线动画')

function run(i) {
  const p = bezier2(i, [0, 100], [150, 50], [200, 200])
  const [x, y] = p
  $('.box').animate(
    {
      left: x + 'px',
      top: y + 'px'
    },
    30,
    () => {
      let next = i + 0.05
      if (next > 1) return
      run(i + 0.05)
    }
  )
}

document.getElementById('btn').onclick = function () {
  run(0)
}
