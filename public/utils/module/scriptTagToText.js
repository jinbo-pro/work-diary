import { previewCode } from './previewCode.js'
/**
 * 收集所有的标签内容添加到页面
 */
async function getTagText(list) {
  let result = ''
  for (let src of list) {
    const deCodeSrc = decodeURIComponent(src)
    const response = await fetch(src)
    const res = await response.text()
    const code = /<title>404<\/title>/.test(res) ? `// 文件获取失败: ${deCodeSrc}` : res
    const fileType = deCodeSrc.split('.').slice(-1)[0]
    const fileName = deCodeSrc.split('/').slice(-1)[0]
    result += `\n## ${fileName}\n` + '```' + `${fileType}\n${code}\n` + '```' + '\n'
  }
  return result
}

;(async () => {
  // 获取 js
  let jsStr = ''
  const srcIgnore = ['https:', 'scriptTagToText.js']
  const scriptTags = document.getElementsByTagName('script')
  for (let item of Array.from(scriptTags)) {
    const src = item.src
    if (!src) {
      jsStr += '```css\n' + item.innerHTML + '\n```\n\n'
    } else if (!srcIgnore.some((e) => src.includes(e))) {
      jsStr += await getTagText([src])
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
    cssStr += await getTagText([src])
  }
  const mdFileStr = `
# js
${jsStr}
# css
${cssStr} 
`
  previewCode(mdFileStr)
})()
