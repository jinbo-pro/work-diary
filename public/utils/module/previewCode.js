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
    min-width: 110px;
  }
  .btn {
    color: #fff;
    cursor: pointer;
    background-color: rgba(64, 158, 255, 0.5);
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    padding: 8px 12px;
    margin: 12px;
    font-size: 14px;
    border-radius: 4px;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.3s;
    z-index: 888;
  }
  .btn:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    transition: 0.3s;
  }
  iframe {
    position: fixed;
    left: 100vw;
    transition: 0.2s;
  }
  iframe.show {
    left: 0;
    transition: 0.2s;
  }
  `
  codeMax.append(style)
  const iframe = document.createElement('iframe')
  const button = document.createElement('button')
  button.className = 'btn'
  button.innerText = '查看代码'
  let isOpen = false
  let isInit = true
  const sleep = (t = 0) => new Promise((a) => setTimeout(a, t))
  button.onclick = async function () {
    if (isOpen) {
      isOpen = false
      button.innerText = '查看代码'
      iframe.className = ''
      await sleep(200)
      iframe.style.display = 'none'
      return
    }
    if (isInit) {
      iframe.style = 'width:100vw;height:90vh;border:none;'
      iframe.src = `/common/parseMarked/parseMarked.html?filePath=${filePath}`
      codeMax.append(iframe)
      isInit = false
    }
    isOpen = true
    button.innerText = '收起代码'
    iframe.style.display = 'block'
    await sleep(200)
    iframe.className = 'show'
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
  previewCode(await requestTagText(pathList))
}
