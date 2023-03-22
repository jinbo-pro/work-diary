console.log('103-计算器原理-逆波兰表达式')

const str = '(11.6 + 22.7 - 0.2) * 3 - (0.1 + 0.2) / 2'
// const str = '(7+2-2)*3-(1+2)/2'
// js:   102.14999999999998
// real: 102.15

const operation = {
  '+': add,
  '-': min,
  '*': tim,
  '/': div
}
/**
 * 用栈结构求后缀表达式的值
 * @param {string} exp 表达式
 * @returns
 */
function countSuffixExpression(exp) {
  var strList = suffixExpression(exp)
  var stack = []
  for (var i = 0; i < strList.length; i++) {
    let item = strList[i]
    if (item in operation) {
      let b = stack.pop()
      let a = stack.pop()
      let result = operation[item](a, b)
      stack.push(result)
    } else {
      stack.push(item)
    }
  }
  return stack.pop()
}

console.time('b')
const result = countSuffixExpression(str)
console.timeEnd('b')
console.log(result, '-->>> result')
