/**
 * 时间格式化
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (arguments.length === 0) {
    return ''
  }
  const format = cFormat
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
 * 时间距离，显示距离当前多少时间
 * @param {number} time
 * @returns {string}
 */
export function formatTime(time) {
  const d = new Date(parseTime(time))
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else {
    return Math.ceil(diff / 3600 / 24) + '天前'
  }
}

/**
 * 获取时间距离[做倒计时很好用]
 * @param {(Object|string|number)} timeStr
 * @param {string} cFormat
 * @returns {string}
 */
export function getTimeDistance(timeStr, cFormat = '{d}:{h}:{m}:{s}') {
  const format = cFormat
  var startTime = new Date(parseTime(timeStr))
  var nowTime = new Date()
  var usedTime = Math.abs(startTime - nowTime)
  var leavel = usedTime % (24 * 3600 * 1000)
  var leavel2 = leavel % (3600 * 1000)
  var leavel3 = leavel2 % (60 * 1000)
  const formatObj = {
    d: Math.floor(usedTime / (24 * 3600 * 1000)),
    h: Math.floor(leavel / (3600 * 1000)),
    m: Math.floor(leavel2 / (60 * 1000)),
    s: Math.floor(leavel3 / 1000)
  }
  const time_str = format.replace(/{(d|h|m|s)+}/g, (result, key) => {
    let value = formatObj[key]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 延迟函数
 * @param {number} t 延迟时间
 */
export function sleep(t = 0) {
  return new Promise((a) => setTimeout(a, t))
}
