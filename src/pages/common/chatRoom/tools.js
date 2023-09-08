const { Toast } = vant

/**安全的解析 JSON 字符串 */
export function parseObj(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}
/**
 * 消息提示
 * @param {string} message
 */
export function tips(message) {
  Toast({
    message: message,
    position: 'middle',
    duration: 2000
  })
}
/**获取当前光标位置 */
export function getCursortPosition(element) {
  var caretOffset = 0
  var sel = window.getSelection()
  if (sel.rangeCount > 0) {
    var range = window.getSelection().getRangeAt(0)
    var preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(element)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    caretOffset = preCaretRange.toString().length
  }
  return caretOffset
}
/**设置光标位置 */
export function setCaretPosition(element, pos) {
  var range, selection
  range = document.createRange()
  range.selectNodeContents(element)
  if (element.innerHTML.length > 0) {
    range.setStart(element.childNodes[0], pos)
  }
  range.collapse(true)
  selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}
