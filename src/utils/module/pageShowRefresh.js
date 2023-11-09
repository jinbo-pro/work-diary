/**
 * 页面显示隐藏函数统一管理
 */

export class PageOnShowRefresh {
  constructor() {
    /**@type {Map<string, function>} */
    this.fnList = new Map()
    this.init()
  }
  init() {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // console.info('显示页面刷新首页数据', fnList)
        this.fnList.forEach((fn) => {
          if (typeof fn == 'function') {
            fn()
          }
        })
      }
    })
  }
  /**
   * 添加刷新函数
   * @param {string} key 函数唯一标识
   * @param {function} fn 刷新函数
   */
  add(key, fn) {
    if (!key || typeof key != 'string') {
      console.log('请传入唯一标识')
      return
    }
    this.fnList.set(key, fn)
  }
  /**
   * 删除函数
   * @param {string} key
   */
  delete(key) {
    if (this.fnList.has(key)) {
      this.fnList.delete(key)
    }
  }
  /**清空 */
  clear() {
    this.fnList.clear()
  }
}

export const pageShowRefresh = new PageOnShowRefresh()

/**
 * 调用示例
// page1
import { pageShowRefresh } from '@/utils/pageShowRefresh'
pageShowRefresh.add('myWork', () => {
  // ...
})

// page2
pageShowRefresh.add('refreshOrderList', () => {
  // ...
})
 */
