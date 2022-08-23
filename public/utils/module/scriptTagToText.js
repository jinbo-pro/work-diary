/**
 * 收集所有的 script 标签内容添加到页面
 */
const scriptTags = document.getElementsByTagName('script')
const srcTxt = document.createElement('div')
srcTxt.innerHTML = Array.from(scriptTags).reduce((p, c) => {
  const txt = c.innerHTML
  p += txt ? `<pre>${txt}</pre>` : ''
  return p
}, '')
const stc = document.getElementById('stc') || document.body
stc.append(srcTxt)
