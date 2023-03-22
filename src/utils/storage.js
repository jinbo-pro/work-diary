const defaultConfig = {
  storage: localStorage,
  prefix: '', // 字段前缀
  expire: 0, // 过期时间 (秒)
  isEncrypt: false // 是否加密
}

class StorageBase {
  constructor(config) {
    const c = Object.assign({}, defaultConfig, config)
    this.storage = c.storage
    this.prefix = c.prefix
    this.expire = c.expire
    this.isEncrypt = c.isEncrypt
  }
  /**添加前缀 */
  addPrefix(key) {
    const prefix = this.prefix ? `${this.prefix}_` : ''
    return this.hasPrefix(key) ? key : `${prefix}${key}`
  }
  /**是否有前缀 */
  hasPrefix(key) {
    const reg = RegExp(`^${this.prefix}`)
    return reg.test(key)
  }
  /**
   * 设置缓存
   * @param {string} key
   * @param {any} val
   * @param {number} expire
   */
  set(key, val, expire = 0) {
    key = this.addPrefix(key)
    if (val === 'undefined' || val === 'null') {
      val = null
    }
    var setData = {
      data: val,
      time: Date.now(),
      type: typeof val
    }
    expire = expire ? expire : this.expire
    if (expire > 0) {
      setData.expire = expire
    }
    const StrVal = JSON.stringify(setData)
    const cache = this.isEncrypt ? this.encrypt(StrVal) : StrVal
    this.storage.setItem(key, cache)
  }
  /**
   * 获取缓存
   * @param {string} key
   * @returns
   */
  get(key) {
    key = this.addPrefix(key)
    var getCache = this.storage.getItem(key)
    if (!getCache) return null
    getCache = this.isEncrypt ? this.decrypt(getCache) : getCache
    let cacheObj = null
    try {
      cacheObj = JSON.parse(getCache)
    } catch (error) {
      console.warn(key, '数据解析失败')
      return null
    }
    if (!cacheObj.type || !cacheObj.time) {
      console.info('数据不符合 setData 接口')
      return null
    }
    const { expire, data, time } = cacheObj
    if (expire > 0) {
      if (expire * 1000 < Date.now() - time) {
        console.info(key, '自动删除过期的数据')
        this.remove(key)
        return null
      }
      // 未过期期间被调用 则自动续期 进行保活
      this.set(key, data, expire)
    }
    return data
  }
  /**获取所有的键名 */
  getKeys() {
    return Object.keys(this.storage).filter((key) => this.hasPrefix(key))
  }
  /**获取所有存储 */
  getAll() {
    return this.getKeys().map((key) => {
      return { key, value: this.get(key) }
    })
  }
  /**
   * 删除指定的缓存
   * @param {string} key
   */
  remove(key) {
    key = this.addPrefix(key)
    this.storage.removeItem(key)
  }
  /**清空所有缓存 */
  clear() {
    this.getKeys().forEach((key) => this.remove(key))
  }
  /**加密 */
  encrypt(data) {
    // 根据需要重写
    return data
  }
  /**解密 */
  decrypt(data) {
    // 根据需要重写
    return data
  }
}

const local = new StorageBase({ storage: localStorage })
const session = new StorageBase({ storage: sessionStorage })
export { local, session, StorageBase }
