// 延迟函数
function sleep(time) {
  return new Promise((a) => {
    setTimeout(() => {
      a()
    }, time)
  })
}

const docList = '😀,😁,😂,🤣,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,🥰,😗,👩,👨,🧑,👱,👵,👻,🥳,🤒,😳,🤪,🥵,☹,😖,😲'.split(',')
const range = { min: 1, max: 50 } // 文案区域(波峰，波谷)
const randomToggleNum = 0.3 // 随机反转几率
let docCount = 1 // 文案叠加初始量
let toggle = true // 反转值 true 增加 false
;(async () => {
  for (let i = 1; i < 800; i++) {
    getRange()
    toggle ? docCount++ : docCount--
    resultDoc()
    await sleep(30)
  }
})()
// 输出文案
function resultDoc() {
  let result = '',
    len = docList.length
  for (let i = 0; i < docCount; i++) {
    result += docList[~~(Math.random() * len)]
  }
  // console.log(result)
  renderDoc(result)
}

// 文字叠加的范围
function getRange() {
  // 随机反转
  if (Math.random() < randomToggleNum) {
    toggle = Math.random() < 0.5
  }
  // 文案区域判断
  if (docCount >= range.max) {
    toggle = false
  } else if (docCount <= range.min) {
    toggle = true
  }
}

// 渲染到页面
function renderDoc(doc) {
  var ulBox = document.getElementById('ulBox')
  var li = document.createElement('li')
  li.innerText = doc
  ulBox.appendChild(li)
}
