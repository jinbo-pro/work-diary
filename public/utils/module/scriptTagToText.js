import { previewCode, requestTagText } from './previewCode.js'
/**
 * 收集所有的标签内容添加到页面
 */
;(async () => {
  // 获取 js
  let jsStr = ''
  const srcIgnore = ['https:', 'scriptTagToText.js']
  const scriptTags = document.getElementsByTagName('script')
  let codeIndex = 1
  for (let item of Array.from(scriptTags)) {
    const src = item.src
    if (!src) {
      const fileName = item.title || `code${codeIndex++}`
      jsStr += `\n## ${fileName}\n` + '```js\n' + item.innerHTML + '\n```\n\n'
    } else if (!srcIgnore.some((e) => src.includes(e))) {
      jsStr += await requestTagText(src)
    }
  }

  // 获取 css
  const styleTags = document.getElementsByTagName('style')
  let cssStr = Array.from(styleTags).reduce((p, c) => {
    p += c.innerHTML
    return p
  }, '')
  const linkIgnore = ['https:']
  const linkTags = document.getElementsByTagName('link')
  for (let item of Array.from(linkTags)) {
    const src = item.href
    if (linkIgnore.some((e) => src.includes(e))) continue
    cssStr += await requestTagText(src)
  }
  const mdFileStr = `
# js
${jsStr}
# css
${cssStr} 
`
  previewCode(mdFileStr)
})()
