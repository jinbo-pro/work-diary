// init vConsole
var vConsole = new VConsole()

var onRepeat = false
/**
 * 大小改变的回调
 * @param {number} scale
 */
function handleZoom(scale) {
  let imgBox = $('#imgBox')
  let css = imgBox.css('max-width')
  let width = parseInt(css) + scale
  console.log(width, '-->>> width')
  $('#imgBox').css('max-width', width + '%')
}

/**
 * 实例化 dom 缩放操作
 */
const imgBoxZoom = new FingerZoom({
  dom: document.querySelector('#imgBox'),
  setScale: function (scale) {
    if (onRepeat) return
    onRepeat = true
    const r = 1
    var scaleNum = 0
    if (scale > 1) {
      scaleNum = scale / r
    } else if (scale < 1) {
      scaleNum = -scale / r
    }
    handleZoom(scaleNum)
    setTimeout(() => {
      onRepeat = false
    }, 100)
  }
})
