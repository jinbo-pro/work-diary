console.log('169-js获取和设置光标位置')

function getCursortPosition(e) {
  // 获取父级元素
  var eleP = e.target.parentNode
  var pos = 0
  if (e.target.nodeName == 'DIV') {
    pos = getDivPosition(e.target)
  } else {
    pos = getPosition(e.target)
  }
  var spanEle = eleP.childNodes[7]
  spanEle.innerText = pos
}

// 可编辑div获取坐标
const getDivPosition = function (element) {
  var caretOffset = 0
  var doc = element.ownerDocument || element.document
  var win = doc.defaultView || doc.parentWindow
  var sel
  // 谷歌、火狐
  if (typeof win.getSelection != 'undefined') {
    sel = win.getSelection()
    // 选中的区域
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0)
      // 克隆一个选中区域
      var preCaretRange = range.cloneRange()
      // 设置选中区域的节点内容为当前节点
      preCaretRange.selectNodeContents(element)
      // 重置选中区域的结束位置
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    }
    // IE
  } else if ((sel = doc.selection) && sel.type != 'Control') {
    var textRange = sel.createRange()
    var preCaretTextRange = doc.body.createTextRange()
    preCaretTextRange.moveToElementText(element)
    preCaretTextRange.setEndPoint('EndToEnd', textRange)
    caretOffset = preCaretTextRange.text.length
  }
  return caretOffset
}

// 输入框获取光标
const getPosition = function (element) {
  let cursorPos = 0
  // IE
  if (document.selection) {
    var selectRange = document.selection.createRange()
    selectRange.moveStart('character', -element.value.length)
    cursorPos = selectRange.text.length
  } else if (element.selectionStart || element.selectionStart == '0') {
    cursorPos = element.selectionStart
  }
  return cursorPos
}
