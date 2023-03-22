/**
 * 解析 range 请求 - 参见： koa-range
 * @param {string} str
 * @param {number} size
 * @returns
 */
function rangeParse(str, size) {
  var token = str.split('=')
  if (!token || token.length != 2 || token[0] != 'bytes') {
    return null
  }
  return token[1]
    .split(',')
    .map(function (range) {
      return range.split('-').map(function (value) {
        if (value === '') {
          return size
        }
        return Number(value)
      })
    })
    .filter(function (range) {
      return !isNaN(range[0]) && !isNaN(range[1]) && range[0] <= range[1]
    })
}

module.exports = {
  rangeParse
}
