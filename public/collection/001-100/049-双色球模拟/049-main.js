// 方案一： 代码较简洁
function createList(total, num) {
  var temp = {}
  var r = []
  while (r.length < num) {
    let k = ~~(Math.random() * total) + 1
    if (!temp[k]) {
      temp[k] = true
      r.push(k)
    }
  }
  return r
}
// 方案一： 运行效率较高
function mainBig() {
  var redList = []
  var blueList = []
  for (let o = 0; o < 33; o++) {
    if (o < 17) {
      blueList.push(o + 1)
    }
    redList.push(o + 1)
  }
  const createList = (list, getNum) => {
    var r = [],
      len = list.length
    while (r.length < getNum) {
      let k = ~~(Math.random() * len)
      let result = list[k]
      if (!r.includes(result)) {
        r.push(result)
      }
    }
    return r
  }
  const red = createList(redList, 6)
  const blue = blueList[~~(Math.random() * 16)]
  red.push(blue)
  return red
}
// 中奖等级判断
function getLv(cur, list) {
  let cBlue = cur[6]
  let oBlue = list[6]
  let curR = cur.slice(0, 6)
  let listR = list.slice(0, 6)
  let red = 0
  for (let i = 0; i < 6; i++) {
    if (listR.includes(curR[i])) {
      red++
    }
  }
  if (cBlue == oBlue) {
    let temp = { 6: 1, 5: 3, 4: 4, 3: 5, 0: 6 }
    return red < 3 ? 6 : temp[red]
  } else {
    let temp = { 6: 2, 5: 4, 4: 5 }
    return red < 4 ? 0 : temp[red]
  }
}
