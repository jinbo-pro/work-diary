/**快照沙箱 */
export class SnapshotSandbox {
  constructor() {
    this.proxy = window //window属性
    this.modifyPropsMap = {} //记录在window上的修改
  }
  active() {
    //激活
    this.windowSnapshot = {} //快照
    for (const prop in window) {
      if (window.hasOwnProperty(prop)) {
        this.windowSnapshot[prop] = window[prop]
      }
      Object.keys(this.modifyPropsMap).forEach((p) => {
        window[p] = this.modifyPropsMap[p]
      })
    }
  }
  inactive() {
    //卸载
    for (const prop in window) {
      if (window.hasOwnProperty(prop)) {
        if (window[prop] != this.windowSnapshot[prop]) {
          this.modifyPropsMap[prop] = window[prop]
          window[prop] = this.windowSnapshot[prop]
        }
      }
    }
  }
}

/**代理沙箱 */
export class legacySandBox {
  constructor() {
    this.addedPropsMapInSandbox = new Map() //记录子应用运行期间新增的key
    this.modifiedPropsOriginalValueMapInSandbox = new Map() //记录子应用运行期间修改的key
    this.currentUpdatedPropsValueMap = new Map() //记录子应用运行期间的值
    this.sandboxRunning = false
    const _this = this
    const fakeWindow = new Proxy(window, {
      set(_, p, value) {
        if (_this.sandboxRunning) {
          if (!window.hasOwnProperty(p)) {
            _this.addedPropsMapInSandbox.set(p, value)
          } else if (!_this.modifiedPropsOriginalValueMapInSandbox.has(p)) {
            const originalValue = window[p]
            _this.modifiedPropsOriginalValueMapInSandbox.set(p, originalValue)
          }
          _this.currentUpdatedPropsValueMap.set(p, value)
          window[p] = value
          return true
        }
        return true
      },
      get(_, p) {
        if (p === 'top' || p === 'window' || p === 'self') {
          return proxy
        }
        return window[p]
      }
    })
    return { sandbox: this, fakeWindow }
  }
  active() {
    //激活
    if (!this.sandboxRunning) {
      this.currentUpdatedPropsValueMap.forEach((v, p) =>
        this.setWindowProp(p, v)
      )
    }
    this.sandboxRunning = true
  }
  inactive() {
    //卸载
    this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) =>
      this.setWindowProp(p, v)
    )
    this.addedPropsMapInSandbox.forEach((v, p) =>
      this.setWindowProp(p, undefined, true)
    )
    this.sandboxRunning = false
  }
  setWindowProp(p, v) {
    window[p] = v
  }
}
