/////////////////////
// 封装节流防抖函数 //
////////////////////

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param timeStamp true表时间戳版，false表定时器版
 */
function throttle(func, wait, timeStamp) {
  var previous = 0
  var timeout
  return function () {
    var context = this
    var args = arguments
    if (timeStamp) {
      var now = Date.now()
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

// 获取 dom 初始化 count
var dom = {}
for (var i = 0; i < 6; i++) {
  dom['div' + i] = document.getElementById('div' + i)
  dom['count' + i] = 1
}
// 未做防抖节流任何处理
dom.div0.onmousemove = function () {
  this.innerText = dom.count0++
}
// 非立即执行的防抖
dom.div1.onmousemove = debounce(function () {
  this.innerText = dom.count1++
}, 1000)

// 立即执行的防抖
dom.div2.onmousemove = debounce(
  function () {
    this.innerText = dom.count2++
  },
  1000,
  true
)

// 时间戳版节流
dom.div3.onmousemove = throttle(
  function () {
    this.innerText = dom.count3++
  },
  1000,
  true
)

// 定时器版节流
dom.div4.onmousemove = throttle(function () {
  this.innerText = dom.count4++
}, 1000)

/**
 * vue 中使用防抖和节流
 */
new Vue({
  el: '#app',
  data() {
    return {
      debounceCount: 1
    }
  },
  methods: {
    setCount() {
      this.debounceCount++
    },
    testClick: debounce(
      function () {
        console.log(arguments, '-->>> 1,2,3')
        this.setCount()
      },
      1200,
      true
    )
  }
})
