/**
 * 预览代码
 * @param {string} fileContent
 */
export function previewCode(fileContent) {
  const mdFile = new File([fileContent], 'code.md', { type: 'text/markdown;charset=utf-8' })
  const filePath = URL.createObjectURL(mdFile)

  const codeContainer = document.createElement('div')
  const codeMax = document.createElement('div')
  codeMax.className = 'code_max'
  const shadow = codeContainer.attachShadow({ mode: 'open' })

  const style = document.createElement('style')
  style.innerHTML = `
  .code_max {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
  }
  .btn {
    color: #fff;
    float: right;
    cursor: pointer;
    background-color: #409eff;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    padding: 8px 12px;
    margin: 12px;
    font-size: 14px;
    border-radius: 4px;
    transition: 0.3s;
  }
  .btn:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    transition: 0.3s;
  }
  `
  codeMax.append(style)
  const iframe = document.createElement('iframe')
  const button = document.createElement('button')
  button.className = 'btn'
  button.innerText = '查看代码'
  let isOpen = false
  let isInit = true
  button.onclick = function () {
    if (isOpen) {
      isOpen = false
      button.innerText = '查看代码'
      iframe.style.display = 'none'
      return
    }
    if (isInit) {
      iframe.style = 'width:95vw;height:90vh;border:none;'
      iframe.src = `/common/parseMarked/parseMarked.html?filePath=${filePath}`
      codeMax.append(iframe)
      isInit = false
    }
    isOpen = true
    button.innerText = '收起代码'
    iframe.style.display = 'block'
  }

  codeMax.append(button)
  shadow.append(codeMax)
  const stx = document.getElementById('stx') || document.body
  stx.append(codeContainer)
}
/**
 * 通过请求获取标签内容
 * @param {string[]|string} list 
 * @returns 
 */
export async function requestTagText(list) {
  let result = ''
  if (typeof list === 'string') {
    list = [list]
  }
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
/**
 * 预览文件列表
 * @param {string[]} pathList
 */
export async function previewCodeFileList(pathList) {
  previewCode(getTagText(pathList))
}
