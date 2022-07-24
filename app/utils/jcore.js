const tree = require('./tree')
/**
 * 时间格式化
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      time = time.replace(/-/g, '/')
    }
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || '0'
  })
  return time_str
}

/**
 * 数组等距拆分
 * @param {array} orgArr
 * @param {number} size
 * @return {array}
 */
function arrayChunk(orgArr, size) {
  size = parseInt(size)
  if (isNaN(size) || size < 1 || size >= orgArr.length) {
    return orgArr
  }
  let newArr = []
  for (let i = 0, len = orgArr.length; i < len; i += size) {
    newArr.push(orgArr.slice(i, i + size))
  }
  return newArr
}

module.exports = {
  tree,
  parseTime,
  arrayChunk
}
