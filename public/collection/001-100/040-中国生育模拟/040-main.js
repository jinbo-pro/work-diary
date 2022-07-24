console.log('040-中国生育模拟')

/**
 * 1为男 0为女
 * 结果为1，继续执行概率为0.2，结果为0，继续执行概率为0.8
 * 后续执行需要乘上之前的概率
 * */
// 1/true 停止， 0/fase 继续
function getVal() {
  return Math.random() > 0.5 ? 1 : 0
}
function create() {
  let n = getVal()
  let p = 1
  let list = []
  let i = 1
  while (p > 0.1) {
    if (n == 0) {
      // 第一胎时是女孩 继续生育的欲望会较高
      let x = 0.8
      if (i == 1) {
        x = 0.9
      }
      p *= x
    } else {
      // 第一胎时即使是男孩 继续生育的欲望也不会马上下降
      let x = 0.2
      if (i == 1) {
        x = 0.6
      } else if (i == 2) {
        x = 0.3
      }
      p *= x
    }
    list.push(n)
    n = getVal()
    if (Math.random() > p) {
      break
    }
    i++
  }
  return list
}
let result = []
for (let i = 0; i < 100; i++) {
  result.push(create())
}
console.log(result)
document.getElementById('result').innerHTML = JSON.stringify(result)
let flatList = result.flat()
//   console.log(flatList)
let count = flatList.reduce(
  (p, c) => {
    if (p[c]) {
      p[c]++
    } else {
      p[c] = 1
    }
    return p
  },
  { sum: flatList.length }
)
console.log(count)

document.getElementById('count').innerHTML = JSON.stringify(count)
