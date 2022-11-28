/**是否手机号码 */
export function isTel(tel) {
  return /^1[3-9]\d{9}$/.test(String(tel))
}
/**是否邮箱 */
export function isEmail(email) {
  return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(String(email))
}
/**是否为整数 含正整数, 负整数, 0 */
export function isInteger(number) {
  return /^-?\d+$/.test(String(number))
}
/**是否正整数，正浮点数和0（常用于商品价格验证） */
export function isPrice(number) {
  return /^\d+(\.\d+)?$/.test(String(number))
}
/**是否实数 */
export function isReal(number) {
  return /^(-?\d+)(\.\d+)?$/.test(String(number))
}
/**是否汉字 */
export function isChinese(content) {
  return /^[\u2E80-\u9FFF]+$/.test(content)
}
/**是否身份证号码 */
export function isIDCard(a) {
  a = a.toUpperCase()
  for (
    var b = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      c = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'],
      d = a + '',
      e = a[17],
      f = d.substring(0, 17),
      g = f.split(''),
      h = g.length,
      j = 0,
      k = 0;
    k < h;
    k++
  )
    j += g[k] * b[k]
  var l = j % 11,
    m = c[l],
    n =
      /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[Xx])$/,
    o = n.test(a)
  return e === m && o
}
/**
 * 密码强度正则
 * 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 */
export function passwordStrong(v) {
  return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(String(v))
}
