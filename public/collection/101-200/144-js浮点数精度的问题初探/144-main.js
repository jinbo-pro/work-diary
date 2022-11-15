import { add, min, tim, div } from './bignumber.js'
// bignumber 使用示例

var c1 = add([0.1, 0.2])
console.log(c1, '-->>> c1') // 0.3

var c2 = min(1.1, 0.3, 0.1)
console.log(c2, '-->>> c2') // 0.7

var c3 = tim(0.7, 0.8)
console.log(c3, '-->>> c3') // 0.56

var c4 = div(c1, 0.1)
console.log(c4, '-->>> c4') // 3
