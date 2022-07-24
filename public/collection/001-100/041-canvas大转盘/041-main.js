var ksid = 0
var time = 5
var index = 0
var prizeList = [
  { name: '罚酒一杯', color: '#000000' },
  { name: '谢谢参与', color: '#AE6947' },
  { name: '和女生对望10秒', color: '#00FF00' },
  { name: '锤胸口', color: '#802A2A' },
  { name: '一句真心话', color: '#00FFFF' },
  { name: '和女生壁咚15秒', color: '#FF00FF' },
  { name: '交杯酒', color: '#082E54' },
  { name: '和团支书喝酒', color: '#C76114' },
  { name: '回答一个问题', color: '#0000FF' },
  { name: '再转一次', color: '#8A2BE2' },
  { name: '爆照一张', color: '#03A89E' },
  { name: '和班长喝酒', color: '#9C661F' }
]
var count = prizeList.length
var angleItem = Math.PI / (count / 2)
var angle = angleItem
var mycanvas = document.getElementById('mycanvas')
mycanvas.width = 600
mycanvas.height = 600
var ctx = mycanvas.getContext('2d')
function createTurntable() {
  //画扇形
  for (var i = 0; i < prizeList.length; i++) {
    ctx.beginPath()
    ctx.moveTo(300, 300)
    ctx.arc(300, 300, 250, i * angleItem, (i + 1) * angleItem)
    ctx.fillStyle = prizeList[i].color
    ctx.fill()
  }
  //画奖项
  ctx.save()
  ctx.translate(300, 300)
  for (var i = 0; i < prizeList.length; i++) {
    ctx.beginPath()
    ctx.font = '20px 微软雅黑'
    ctx.fillStyle = 'white'
    ctx.rotate(angleItem)
    ctx.fillText(prizeList[i].name, 100, 40)
    ctx.fill()
  }
  ctx.restore()

  //GO圆
  ctx.beginPath()
  ctx.arc(300, 300, 40, 0, 2 * Math.PI)
  ctx.fillStyle = 'brown'
  ctx.fill()
  ctx.beginPath()
  ctx.fillStyle = 'red'
  ctx.font = '30px 微软雅黑'
  ctx.fillText('GO', 277, 310)
  ctx.fill()
}

//旋转转盘
function rotateTurntable() {
  time += Math.random() * 5
  if (time > 1000) {
    stop()
  }
  index++
  ctx.clearRect(0, 0, 600, 600)
  createTurntable()
  //红色扇形旋转
  ctx.save()
  ctx.translate(300, 300)
  ctx.beginPath()
  ctx.rotate(angle)
  ctx.moveTo(0, 0)
  ctx.arc(0, 0, 100, 0, angleItem)
  ctx.fillStyle = 'red'
  ctx.fill()
  angle += angleItem
  ctx.restore()
}

function random() {
  var ran1 = ~~(Math.random() * 20) + 1
  var ran2 = ~~(Math.random() * 20) + 1
  console.log(ran1 + ':' + ran2)
  document.getElementById('ran1').value = `男生 ${ran1} 号`
  document.getElementById('ran2').value = `女生 ${ran2} 号`
}

window.onload = createTurntable

function start() {
  stop()
  ksid = setInterval(rotateTurntable, time)
}

function stop() {
  time = 5
  if (ksid) {
    clearInterval(ksid)
    ksid = null
  }
  let cur = prizeList[index % count]
  console.log(cur, '-->>> cur')
}
