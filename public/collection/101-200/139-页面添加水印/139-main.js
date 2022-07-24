console.log('139-页面添加水印')
//设置水印
export function __canvasWM({
  container = document.body,
  width = '700px',
  height = '180px',
  textAlign = 'center',
  textBaseline = 'middle',
  font = '16px Microsoft Yahei',
  fillStyle = 'rgba(184, 184, 184, 0.6)',
  content = '水印',
  rotate = '10',
  zIndex = 30,
  time = `2021-10-14 11:15`
} = {}) {
  const canvas = document.createElement('canvas')
  //计算宽度
  let minWidth = time.length * 19.5
  if (parseFloat(width) < minWidth) {
    width = minWidth + 'px'
  }

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx = canvas.getContext('2d')
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate((Math.PI / 180) * rotate)
  //绘制文字
  ctx.fillText(content, parseFloat(width) / 2, 20)
  //绘制时间戳
  ctx.fillText(time, parseFloat(width) / 2, 55)
  const base64Url = canvas.toDataURL()
  const __wm = document.querySelector('.__wm')
  const watermarkDiv = __wm || document.createElement('div')
  /**
   * pointer-events: none;
   * 不接受鼠标事件，点击会穿透到下面的元素
   */
  const styleStr = `
                position:fixed;
                top:0;
                left:0;
                bottom:0;
                right:0;
                width:100%;
                height:100%;
                z-index:${zIndex};
                pointer-events:none;
                background-repeat:repeat;
                background-image:url('${base64Url}')`

  watermarkDiv.setAttribute('style', styleStr)
  watermarkDiv.classList.add('__wm')
  if (!__wm) {
    container.insertBefore(watermarkDiv, container.firstChild)
  }
}

// 设置水印
export function setWatermarkTxt(rootDom) {
  let text = '我是水印内容'
  __canvasWM({
    content: text,
    width: text.length * 19.5 + 'px',
    container: rootDom,
    time: new Date().toLocaleString()
  })
}

const app = document.getElementById('app')
setWatermarkTxt(app)

const btn = document.getElementById('btn')
btn.onclick = function () {
  console.log(678, '-->>> 678')
}
