/**
 * 跨页面通信
 */
export class CrossPageInfo {
  constructor(name) {
    this.channel = new BroadcastChannel(name)
    this.fnList = new Set()
    this.channel.addEventListener('message', (e) => this.run(e.data))
  }
  run(data) {
    this.fnList.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(data)
      }
    })
  }
  emit(data) {
    this.channel.postMessage(data)
  }
  on(callBack) {
    this.fnList.add(callBack)
  }
  remove(fn) {
    this.fnList.delete(fn)
  }
  clear() {
    this.fnList.clear()
  }
}
