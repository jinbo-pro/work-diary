function add(x) {
  console.log(x, 'add -- [ x ]')
  return x * 2
}

function addEasy(x) {
  return function (y) {
    return x + y
  }
}

var result = addEasy(1)(2)
// console.log(result, '-->>> 678');

function memoization(fn) {
  var cachedArg
  var cachedResult
  return function (arg) {
    if (cachedArg === arg) {
      return cachedResult
    }
    cachedArg = arg
    cachedResult = fn(arg)
    return cachedResult
  }
}

const memoCallAdd = memoization(add)

var a1 = memoCallAdd(1)
console.log(a1, '-->>> a1')
var a2 = memoCallAdd(1)
console.log(a2, '-->>> a2')
