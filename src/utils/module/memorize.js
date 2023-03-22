/**
 * 函数只执行一次
 * @param {function} fn
 * @returns
 */
export function once(fn) {
  let toggle = false
  let value = null
  return function () {
    if (toggle) return value
    toggle = true
    return (value = fn.apply(this, arguments))
  }
}

/**
 * 函数记忆
 * @param {function} fn
 * @returns
 */
export function memorize(fn) {
  // 保存缓存的对象
  const cacheMap = new Map()
  return function () {
    // 产生一个缓存的键： 参数长度+参数
    const key = arguments.length + Array.from(arguments).toString()
    if (cacheMap.has(key)) {
      return cacheMap.get(key)
    } else {
      const value = fn.apply(this, arguments)
      cacheMap.set(key, value)
    }
  }
}
