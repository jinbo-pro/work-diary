console.log('096-前端验证码生成')
/** 生成字母数组* */
function getAllLetter() {
  var letterStr =
    'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
  return letterStr.split(',')
}
/** 生成一个随机数* */
function randomNum(min, max) {
  return ~~(Math.random() * (max - min) + min)
}
/** 生成一个随机色* */
function randomColor(min, max) {
  var r = randomNum(min, max)
  var g = randomNum(min, max)
  var b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}
/**
 * 验证码
 */
class GVerify {
  constructor(options) {
    const o = {
      id: '', // 容器Id
      canvasId: 'verifyCanvas', // canvas的ID
      width: '100', // 默认canvas宽度
      height: '30', // 默认canvas高度
      type: 'blend' // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    }
    this.code = ''
    this.options = Object.assign({}, o, options)
    this.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',')
    this.letterArr = getAllLetter()
    this._init()
    this.create()
  }
  _init() {
    var con = document.getElementById(this.options.id)
    var canvas = document.createElement('canvas')
    this.options.width = con.offsetWidth > 0 ? con.offsetWidth : '100'
    this.options.height = con.offsetHeight > 0 ? con.offsetHeight : '30'
    canvas.id = this.options.canvasId
    canvas.width = this.options.width
    canvas.height = this.options.height
    canvas.style.cursor = 'pointer'
    canvas.innerHTML = '您的浏览器版本不支持canvas'
    con.appendChild(canvas)
    var parent = this
    canvas.onclick = function () {
      parent.create()
    }
  }
  /** 生成验证码* */
  create() {
    this.code = ''
    var canvas = document.getElementById(this.options.canvasId)
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d')
    } else {
      return
    }

    /** 绘制渐变背景 */
    ctx.textBaseline = 'middle'
    var grad = ctx.createLinearGradient(0, 0, 300, 0) // 创建一个渐变色线性对象
    grad.addColorStop(0, randomColor(120, 240)) // 定义渐变色颜色
    grad.addColorStop(1, randomColor(120, 240))
    ctx.fillStyle = grad // 设置fillStyle为当前的渐变对象
    ctx.fillRect(0, 0, 300, 100) // 绘制渐变图形

    if (this.options.type == 'blend') {
      // 判断验证码类型
      var txtArr = this.numArr.concat(this.letterArr)
    } else if (this.options.type == 'number') {
      var txtArr = this.numArr
    } else {
      var txtArr = this.letterArr
    }
    for (var i = 1; i <= 4; i++) {
      var txt = txtArr[randomNum(0, txtArr.length)]
      this.code += txt
      ctx.font =
        randomNum(this.options.height / 2, this.options.height) + 'px SimHei' // 随机生成字体大小
      ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
      ctx.shadowOffsetX = randomNum(-3, 3)
      ctx.shadowOffsetY = randomNum(-3, 3)
      ctx.shadowBlur = randomNum(-3, 3)
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      var x = (this.options.width / 5) * i
      var y = this.options.height / 2
      var deg = randomNum(-30, 30)
      /** 设置旋转角度和坐标原点* */
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      /** 恢复旋转角度和坐标原点* */
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    }
    /** 绘制干扰线 */
    for (var i = 0; i < 6; i++) {
      ctx.strokeStyle = randomColor(40, 180)
      ctx.beginPath()
      ctx.moveTo(
        randomNum(0, this.options.width),
        randomNum(0, this.options.height)
      )
      ctx.lineTo(
        randomNum(0, this.options.width),
        randomNum(0, this.options.height)
      )
      ctx.stroke()
    }
    /** 绘制干扰点 */
    for (var i = 0; i < this.options.width / 4; i++) {
      ctx.fillStyle = randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(
        randomNum(0, this.options.width),
        randomNum(0, this.options.height),
        1,
        0,
        2 * Math.PI
      )
      ctx.fill()
    }
  }
  /** 验证验证码* */
  validate(code) {
    var code = code.toLowerCase()
    var v_code = this.code.toLowerCase()
    if (code == v_code) {
      return true
    } else {
      return false
    }
  }
}
const code = new GVerify({ id: 'code' })
function validCode() {
  const resultDom = document.getElementById('result')
  const inputCode = document.getElementById('inputCode')
  let result = code.validate(inputCode.value)
  if (result) {
    resultDom.innerText = '验证成功'
    resultDom.style.color = 'blue'
  } else {
    resultDom.innerText = '验证失败'
    resultDom.style.color = 'red'
  }
}
