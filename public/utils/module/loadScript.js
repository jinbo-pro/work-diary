import { textHax } from '../easyHash.js'

/**
 * 动态加载 script
 * @param {string} src 
 * @returns 
 */
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const id = textHax(src)
    if (document.getElementById(id)) {
      return resolve()
    }
    const s = document.createElement('script')
    s.src = src
    s.id = id
    s.onload = resolve
    s.onerror = reject
    document.body.append(s)
  })
}
