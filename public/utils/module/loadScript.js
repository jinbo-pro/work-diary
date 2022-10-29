const scriptMap = new Map()

/**
 * 动态加载 js, css 资源
 * @param {string} src
 * @param {string} type
 * @returns
 */
export function loadScript(src, type = 'script') {
  return new Promise((resolve, reject) => {
    const oId = scriptMap.get(src)
    if (oId && document.getElementById(oId)) {
      return resolve()
    }
    const id = 'loadScript-' + Date.now() + Math.random()
    const tag = document.createElement(type)
    if (type == 'script') {
      tag.src = src
    } else {
      tag.href = src
      tag.rel = 'stylesheet'
    }
    tag.id = id
    tag.onload = resolve
    tag.onerror = reject
    document.body.append(tag)
    scriptMap.set(src, id)
  })
}
