import { previewCode, requestTagText } from './previewCode.js'
/**
 * 收集所有的标签内容添加到页面
 */
;(async () => {
  // 获取 js
  const srcIgnore = [
    'https:', // 外部链接
    'scriptTagToText.js' // 自己
  ]
  const scriptTags = document.getElementsByTagName('script')
  const importReg = /import\s([\s\S]+?)\sfrom\s'([\s\S]+?)'/g
  // 解析内部引用的模块
  const loopParseCode = async (src) => {
    if (srcIgnore.some((e) => src.includes(e))) return ''
    const code = await requestTagText(src)
    const innerCodeList = []
    code.replace(importReg, (a, mode, path) => innerCodeList.push(path))
    let childrenCode = ''
    for (let item of innerCodeList) {
      childrenCode += await loopParseCode(item)
    }
    return code + childrenCode
  }
  let jsStr = ''
  let codeIndex = 1
  let requestSrcList = []
  for (let item of Array.from(scriptTags)) {
    const src = item.src
    const content = item.innerHTML
    if (src) {
      requestSrcList.push(src)
    } else if (content) {
      content.replace(importReg, (a, mode, path) => requestSrcList.push(path))
      const fileName = item.title || `code${codeIndex++}`
      jsStr += `\n## ${fileName}\n` + '```js\n' + content + '\n```\n\n'
    }
  }
  for (let item of requestSrcList) {
    jsStr += await loopParseCode(item)
  }

  // 获取 css
  const styleTags = document.getElementsByTagName('style')
  const cssIgnore = [
    '--VC-DOM' // vConsole 样式
  ]
  let cssStr = Array.from(styleTags).reduce((p, c) => {
    p += cssIgnore.some((x) => c.innerHTML.includes(x)) ? '' : c.innerHTML
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
