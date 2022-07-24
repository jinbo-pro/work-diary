const letBaseList = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ']
const keys = new Map<string, number>()
const values = new Map<number, string>()
letBaseList.forEach((k, i) => {
  const n = i + 1
  keys.set(k, n)
  values.set(n, k)
})
const max = letBaseList.length
/**通过单位获取索引 */
export function getIndexByUnit(unit: string) {
  const list = [...unit]
  const maxLen = list.length - 1
  return list.reduce((p, c, i) => {
    p += Math.pow(max, maxLen - i) * keys.get(c)!
    return p
  }, 0)
}
/**通过索引获取单位 */
export function getUnitByIndex(index: number) {
  let unit = ''
  while (index) {
    unit = values.get(index % max) + unit
    index = parseInt(String(index / max))
  }
  return unit
}

/**
 * 不初始生成单位数组节省内存
 * 通过计算得到单位或索引
 */
const str = ['a', 'aaa', 'cc', 'zc', 'cba', 'Vue', 'React']
const s = str.map((e) => {
  return {
    str: e,
    index: getIndexByUnit(e)
  }
})

const orc = s.map((e) => {
  return {
    ...e,
    p: getUnitByIndex(e.index)
  }
})
console.log(orc, '-->>> orc')

document.body.innerHTML = JSON.stringify(orc)
