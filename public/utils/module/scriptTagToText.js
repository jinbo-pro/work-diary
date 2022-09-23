import { previewCode } from './previewCode.js'
/**
 * 收集所有的 script 标签内容添加到页面
 */
const srcIgnore = ['https://', 'scriptTagToText.js']
const scriptTags = document.getElementsByTagName('script')
const parseName = (s) => {
  if (!s) return 'script'
  return decodeURIComponent(s).split('/').slice(-1)[0]
}
const mdStrList = []
let index = 1
;(async () => {
  for (let item of Array.from(scriptTags)) {
    const src = item.src
    let code = item.innerHTML
    if (srcIgnore.some((e) => src.includes(e))) continue
    if (src) {
      const response = await fetch(src)
      const res = await response.text()
      code = /<title>404<\/title>/.test(res) ? `// 文件获取失败: ${decodeURIComponent(src)}` : res
    }
    mdStrList.push(`# ${index++}. ${parseName(src)}\n` + '```js\n' + code + '\n```')
  }
  previewCode(mdStrList.join('\n\n'))
})()
