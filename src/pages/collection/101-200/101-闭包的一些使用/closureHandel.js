/**
 * utils
 */
function sleep(time) {
  return new Promise((a) => setTimeout(a, time))
}

function add(x, y) {
  return x + y
}

let a = add(1, 2)
console.log(a, '-->>> a')

// 1. 柯里化
function addk(x) {
  return function (y) {
    return x + y
  }
}
let b = addk(1)(2)
console.log(b, '-->>> b')

// 封装一步操作
const oneAdd = addk(1)
let c = oneAdd(3)
console.log(c, '-->>> c')

// 用途
let flag = false
function handel(data) {
  if (flag) return
  flag = true
  setTimeout(() => {
    console.log(data)
    flag = false
  }, 500)
}

// 2. 函数防抖
function waper() {
  let flag = false
  return function (data) {
    if (flag) return
    flag = true
    setTimeout(() => {
      console.log(data)
      flag = false
    }, 500)
  }
}

const handelDk = waper()

// 调用
async function testHandel() {
  for (let i = 0; i < 10; i++) {
    await sleep(100)
    handel(i)
  }
}
testHandel()

async function testHandelDk() {
  for (let i = 0; i < 10; i++) {
    await sleep(100)
    handelDk(i)
  }
}
testHandelDk()

// 3. 函数 memoizing 缓存
function createMemo() {
  let args
  let result
  return function (data) {
    if (data === args) {
      return result
    }
    console.log('run fn')
    args = data
    result = data * 2
    return result
  }
}

const memoizing = createMemo()
memoizing(1)
memoizing(2)
memoizing(2)
memoizing(2)
