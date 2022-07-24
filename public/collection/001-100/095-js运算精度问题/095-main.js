console.log('095-js运算精度问题')
console.log(0.1 + 0.2, '0.1+0.2')
console.log(0.7 * 0.8, '0.7*0.8')

// 解决方案
// 使用 bignumber 拓展js的数值
console.log('==============')
var c1 = add([0.1, 0.2])
console.log(c1, '-->>> c1') // 0.3

var c2 = min(1.1, 0.3, 0.1)
console.log(c2, '-->>> c2') // 0.7

var c3 = tim(0.7, 0.8)
console.log(c3, '-->>> c3') // 0.56

var c4 = div(c1, 0.1)
console.log(c4, '-->>> c4') // 0.2

// 更加方便的使用 可以参考 25 计算器原理逆波兰表达式
