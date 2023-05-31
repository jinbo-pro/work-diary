import { McTimer } from '@/utils/module/McTimer.js'
console.log('117-更好的定时器管理')

// 基本功能展示
for (let i = 1; i < 5; i++) {
  const count = 10 * i
  const li = $(`
  <li>
    <p>count [ ${count} ] </p>
    <button class="start">开始</button>
    <button class="paused">暂停</button>
    <button class="reset">重置</button>
    <span class="count"></span>
  </li>
  `)
  const t = new McTimer({
    count,
    complete: (c) => {
      li.find('.count').text(c)
    },
    done: () => {
      li.find('.start').attr('disabled', false)
    }
  })
  // 开始
  li.find('.start').on('click', function () {
    $(this).attr('disabled', true)
    t.start()
  })
  // 暂停
  li.find('.paused').on('click', function () {
    t.paused()
    if (t.isPaused) {
      $(this).text('继续')
    } else {
      $(this).text('暂停')
    }
  })
  // 重置
  li.find('.reset').on('click', function () {
    li.find('.start').attr('disabled', false)
    t.reset()
  })
  $('#box').append(li)
}

// 无限循环记录时间
var countDown = new McTimer({
  count: 1,
  step: 0,
  complete: () => {
    let now = new Date()
    $('.next_time').text(`当前时间 ${now.toLocaleString()}`)
  }
})
