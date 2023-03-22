console.log('170-100囚犯用数据拯救自己问题')
/**总数 */
const total = 100
/**可尝试次数 */
const tryCount = 50

function userTry(callBack, type) {
  let success = 0
  let fail = 0
  for (let i = 0; i < total; i++) {
    callBack(i) ? success++ : fail++
  }
  const li = document.createElement('li')
  li.className = success == total ? 'success' : 'fail'
  li.innerHTML = `成功 [${success}] 失败 [${fail}]`
  const app = document.getElementById(`app${type}`)
  app.insertBefore(li, app.firstChild)
}
// 创建盒子
function createBoxList() {
  const box = []
  for (let i = 0; i < total; i++) {
    box.push(i)
  }
  box.sort(() => 0.5 - Math.random())
  return box
}

// 随机尝试
function main1() {
  // 创建盒子放置卡牌
  const box = createBoxList()
  // 模拟抽卡
  userTry((userId) => {
    const tempList = [...box]
    const select = tempList.sort(() => 0.5 - Math.random()).slice(0, tryCount)
    return select.includes(userId)
  }, 1)
}

// 策略尝试
function main2() {
  // 创建盒子放置卡牌
  const box = createBoxList()
  // 模拟抽卡
  userTry((userId) => {
    let count = tryCount
    let tempId = userId
    while (count) {
      let cur = box[tempId]
      if (cur === userId) {
        return true
      }
      tempId = cur
      count--
    }
    return false
  }, 2)
}

const sleep = (t = 0) => new Promise((a) => setTimeout(a, t))
async function testMore() {
  for (let i = 0; i < 10; i++) {
    main1()
    main2()
    await sleep(30)
  }
}
