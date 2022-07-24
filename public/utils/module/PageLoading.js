/**
 * 页面加载样式
 */
const style = `
.loading_max {width: 100vw;height: 100vh;box-sizing: border-box;position: fixed;top: 0;left: 0;z-index: 1000;display: flex;align-items: center;justify-content: center;background-color: rgba(255, 255, 255, 0.7);}
.loading {width: 2.5em;height: 2.5em;transform: rotate(165deg);}
.loading:before, .loading:after {content: '';position: absolute;top: 50%;left: 50%;display: block;width: 0.5em;height: 0.5em;border-radius: 0.25em;transform: translate(-50%, -50%);}
.loading:before {animation: before 2s infinite;}
.loading:after {animation: after 2s infinite;}
@keyframes before {
  0% {width: 0.5em;box-shadow: 1em -0.5em #6e4e9e, -1em 0.5em #b19dce;}
  35% {width: 2.5em;box-shadow: 0 -0.5em #6e4e9e, 0 0.5em #b19dce;}
  70% {width: 0.5em;box-shadow: -1em -0.5em #6e4e9e, 1em 0.5em #b19dce;}
  100% {box-shadow: 1em -0.5em #6e4e9e, -1em 0.5em #b19dce;}
}
@keyframes after {
  0% {height: 0.5em;box-shadow: 0.5em 1em #967bbd, -0.5em -1em #ccbfdf;}
  35% {height: 2.5em;box-shadow: 0.5em 0 #967bbd, -0.5em 0 #ccbfdf;}
  70% {height: 0.5em;box-shadow: 0.5em -1em #967bbd, -0.5em 1em #ccbfdf;}
  100% {box-shadow: 0.5em 1em #967bbd, -0.5em -1em #ccbfdf;}
}
`
class PageLoading {
  constructor() {
    this.dom = document.createElement('div')
    this.dom.className = 'loading_max'
    this.dom.style.display = 'none'
    this.dom.innerHTML = `<div class="loading"></div>`
    document.body.append(this.dom)
    const css = document.createElement('style')
    css.innerHTML = style
    document.body.append(css)
  }
  open() {
    this.dom.style.display = 'flex'
  }
  close() {
    this.dom.style.display = 'none'
  }
}

let loading = null

export function createLoading() {
  if (loading) return loading
  loading = new PageLoading()
  return loading
}
