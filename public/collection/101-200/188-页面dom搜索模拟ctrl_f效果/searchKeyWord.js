const getNodeList = ['div', 'span', 'p', 'li']

/**
 * 获取有有字符串的dom
 * @param {HTMLElement[]} domList
 * @param {string} tag
 * @returns
 */
function getTextDoms(domList, tag) {
  let result = []
  for (let dom of Array.from(domList)) {
    if (dom.children.length) {
      result.push(...getTextDoms(dom.children))
    } else if (tag === dom.nodeName.toLocaleLowerCase() && dom.innerHTML) {
      result.push(dom)
    }
  }
  return result
}

/**清除搜索 */
export function clearSearch() {
  document.querySelectorAll('.highlight_text').forEach((item) => {
    item.replaceWith(item.innerHTML)
  })
}

/**
 * 搜索
 * @param {string} key
 */
export function searchKeyWord(key) {
  clearSearch()
  if (!key) return
  let list = getNodeList.map((tag) => getTextDoms(document.querySelectorAll(tag), tag))
  for (let item of list.flat()) {
    const reg = RegExp(key, 'gi')
    item.innerHTML = item.innerHTML.replace(reg, (a) => `<em class="highlight_text">${a}</em>`)
  }
}
