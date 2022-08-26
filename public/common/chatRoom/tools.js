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
/**
 * 富文本图片自适应
 * @param {string} content
 * @returns
 */
export function richImgWidth(content) {
  const regex = new RegExp('<img', 'gi')
  return content.replace(regex, `<img style="max-width: 100%; height: auto"`)
}
