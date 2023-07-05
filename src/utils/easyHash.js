/**
 * 生成全局唯一标识符 guid
 * @returns
 */
export function guid() {
  const S = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return Array(8).fill(1).map(S).join('')
}
/**
 * 生成全局唯一标识符 nanoid
 * @param {number} size 生成位数
 * @returns
 */
export function nanoid(size = 21) {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}
/**
 * 文字简单hash
 * @param {string} str 文本
 */
export function textHax(str) {
  str = String(str)
  for (var i = 0, num = 0, len = str.length; i < len; i++) {
    num += str.charCodeAt(i) / (i + Math.PI)
  }
  return (String(num).replace('.', '') - 0).toString(36)
}
/**
 * 随机数字
 * @param {number} max 最大值
 * @param {number} min 最小值
 * @returns
 */
export function randomNum(max, min = 0) {
  return ~~(Math.random() * max) + min
}
/**
 * 随机从数组取一个
 * @param {any[]} list
 * @returns
 */
export function randomList(list) {
  return list[randomNum(list.length)]
}
//
/**
 * 随机字符串
 * @param {number} len 截取长度
 * @param {number[]} types 字符类型 1数字 2小写字母 3大写字母 4符号
 * @returns
 */
export function randomString(len, types) {
  // 密码字符集
  const dataObj = {
    // 重复数字和符号是为了使数字与字符的获取概率大致相当
    1: [...'01234567899876543210258'],
    2: [...'abcdefghijklmnopqrstuvwxyz'],
    3: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
    4: [...'.@$%&()_-+?.@$%&()_-+?']
  }
  let list = []
  for (let key in dataObj) {
    if (types.some((e) => e == key)) {
      list.push(...dataObj[key])
    }
  }
  var result = ''
  for (var i = 0; i < len; i++) {
    result += randomList(list)
  }
  return result
}
/**
 * 随机字符串-unicode版
 * @param {number} len 随机字符长度
 * @param {number} minCode 最小unicode
 * @param {number} maxCode 最大unicode
 * @returns
 */
export function randomStringUnicode(len = 16, minCode = 32, maxCode = 126) {
  // 可打印的ASCII字符 https://www.runoob.com/tags/html-ascii.html
  let result = ''
  for (let i = 0; i < len; i++) {
    const code = parseInt(Math.random() * (maxCode - minCode) + minCode)
    result += String.fromCharCode(code)
  }
  return result
}
