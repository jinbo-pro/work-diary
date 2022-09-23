// const { BigNumber } = require('bignumber.js');

function bigMain(arg, type) {
  if (Array.isArray(arg[0])) {
    arg = arg[0]
  }
  arg = arg.filter((e) => e).map((e) => parseFloat(e))
  if (arg.length == 0) return ''
  let first = arg.splice(0, 1)
  let result = new BigNumber(first)
  for (let item of arg) {
    result = result[type](new BigNumber(item))
  }
  return result.toString()
}

// more see: https://blog.csdn.net/shenxianhui1995/article/details/103985434

/**
 * 加 +
 */
const add = (...a) => bigMain(a, 'plus')
/**
 * 减 -
 */
const min = (...a) => bigMain(a, 'minus')
/**
 * 乘 *
 */
const tim = (...a) => bigMain(a, 'times')
/**
 * 除 /
 */
const div = (...a) => bigMain(a, 'div')

/**
 * test
 * tips: 可以传入多个参数 或者一个数组
 */

/*
var c1 = add([0.1, 0.2])
console.log(c1, '-->>> c1'); // 0.3

var c2 = min(1.1, 0.3, 0.1)
console.log(c2, '-->>> c2'); // 0.7

var c3 = tim(0.7, 0.8)
console.log(c3, '-->>> c3'); // 0.56

var c4 = div(c1, 0.1)
console.log(c4, '-->>> c4'); // 0.2
*/
