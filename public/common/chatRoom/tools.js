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
