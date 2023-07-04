/**
 * 页面显示隐藏函数统一管理
 */

/**函数列表 */
const fnList = new Map()

/**
 * 添加刷新函数
 * @param {string} key 函数唯一标识
 * @param {function} fn 刷新函数
 */
export function pageShowRefresh(key, fn) {
  if (!key || typeof key != 'string') {
    console.log('请传入唯一标识')
    return
  }
  fnList.set(key, fn)
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // console.info('显示页面刷新首页数据', fnList)
    fnList.forEach((fn) => fn())
  }
})

/**
 * 调用示例
// page1
import { pageShowRefresh } from '@/utils/pageShowRefresh'
pageShowRefresh('myWork', () => {
  // ...
})

// page2
pageShowRefresh('refreshOrderList', () => {
  // ...
})
 */
