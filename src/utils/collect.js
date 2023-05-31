/**
 * 获取数据类型
 */
export function getType(data) {
  if (data === null) return 'null'
  return Object.prototype.toString.call(data).replace('[object ', '').replace(']', '').toLowerCase()
}

/**
 * 对象简单深度合并
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * 对象深度合并 - 支持数组对象
 * @param {any} target
 * @param  {...any} arg
 * @returns
 */
export function merge(target, ...arg) {
  return arg.reduce((acc, cur) => {
    return Object.keys(cur).reduce((subAcc, key) => {
      const srcVal = cur[key]
      if (Array.isArray(srcVal)) {
        subAcc[key] = srcVal.map((item, idx) => {
          if (typeof item == 'object' && !Array.isArray(item)) {
            const curAccVal = subAcc[key] ? subAcc[key] : []
            return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
          } else {
            return item
          }
        })
      } else if (typeof srcVal == 'object') {
        subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
      } else {
        subAcc[key] = srcVal
      }
      return subAcc
    }, acc)
  }, target)
}

/**
 * 连字符转驼峰名
 * @param {string} params
 * @param {string} type
 * @return {string}
 */
export function humpName(params, type = '-') {
  var arr = params.split('')
  if (arr.indexOf(type) == 0) {
    arr.splice(0, 1)
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == type) {
      arr.splice(i, 1)
      arr[i] = arr[i].toUpperCase()
    }
  }
  return arr.join('')
}

/**
 * 驼峰名转连字符
 * @param {string} str
 * @param {string} type
 * @return {string}
 */
export function toLowerLine(str, type = '-') {
  var temp = str.replace(/[A-Z]/g, function (match) {
    return type + match.toLowerCase()
  })
  if (temp.slice(0, 1) === type) {
    temp = temp.slice(1)
  }
  return temp
}

/**
 * 数组随机排序
 * @param {any} array
 */
export function arrayRandom(array) {
  var res = []
  for (var i = 0, len = array.length; i < len; i++) {
    var randomIndex = Math.floor(Math.random() * array.length)
    res[i] = array[randomIndex]
    array.splice(randomIndex, 1)
  }
  return res
}

/**
 * 数组等距拆分
 * @param {array} orgArr
 * @param {number} size
 * @return {array}
 */
export function arrayChunk(orgArr, size) {
  size = parseInt(size)
  if (isNaN(size) || size < 1 || size >= orgArr.length) {
    return [orgArr]
  }
  let newArr = []
  for (let i = 0, len = orgArr.length; i < len; i += size) {
    newArr.push(orgArr.slice(i, i + size))
  }
  return newArr
}

/**
 * 对象深拷贝【简易版】不拷贝对象里面的函数
 * @param {Object} source
 * @returns {Object}
 */
export function deepCloneJson(source) {
  return JSON.parse(JSON.stringify(source))
}

/**
 * 函数防抖
 * @param {Function} func 函数
 * @param {number} wait 延时
 * @param {boolean} immediate 是否立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param timeStamp true 时间戳版，false 定时器版
 */
export function throttle(func, wait, timeStamp) {
  var previous = 0
  var timeout
  return function () {
    var context = this
    var args = arguments
    if (timeStamp) {
      var now = Date.now()
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * 数字补零
 * @param {number} num
 * @param {number} length
 * @returns
 */
export function prefixNum(num, length = 1) {
  return num ? String(num).padStart(length, '0') : ''
}

/**
 * 软件版本比较
 * @param {string} currVersion
 * @param {string} targetVerison
 * @returns
 */
export function compareVersion(currVersion, targetVerison) {
  if (!currVersion || !targetVerison) return false
  const curr = currVersion.split('.')
  const target = targetVerison.split('.')
  for (let i = 0; i < curr.length; i++) {
    if (parseInt(curr[i]) > parseInt(target[i])) {
      return true
    }
    if (parseInt(curr[i]) < parseInt(target[i])) {
      return false
    }
  }
  return false
}
/**
 * 加载 img 为dom
 * @param {string} src
 * @returns
 */
export function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}

/**
 * 计算附件大小
 * @param {String} size
 * @param {String} unit
 */
export function countFileSize(size, unit = 0) {
  size = Number(size)
  const unitArr = ['KB', 'M', 'G']
  if (isNaN(size)) return ''
  size = (size / 1024).toFixed(2)
  if (size > 1024) {
    unit++
    return countFileSize(size, unit)
  }
  return size + unitArr[unit]
}
