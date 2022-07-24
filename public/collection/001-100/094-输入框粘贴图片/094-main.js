/**
 * 自定义粘贴事件
 */
const app = document.getElementById('app')
app.addEventListener('paste', function (event) {
  event.stopPropagation()
  event.preventDefault()
  var file = null
  var items = (event.clipboardData || window.clipboardData).items
  if (items && items.length) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        file = items[i].getAsFile()
        break
      }
    }
  }
  if (!file) {
    console.log('粘贴的不是图片')
    return
  }
  console.log(file, '-->>> file')

  // ... 上传到服务器， 返回图片地址， 并显示在需要的位置
  // 这里直接转为本地链接 模拟上传操作
  const imgUrl = URL.createObjectURL(file)
  /**
   * document.execCommand
   * 在可编辑元素的当前操作位置插入内容
   * see: https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
   */
  document.execCommand('InsertImage', false, imgUrl)
})
