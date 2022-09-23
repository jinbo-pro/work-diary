/**
 * 预览代码
 * @param {string} fileContent
 */
export async function previewCode(fileContent) {
  const mdFile = new File([fileContent], 'test.md', { type: 'text/markdown;charset=utf-8' })
  const filePath = URL.createObjectURL(mdFile)

  const codeContainer = document.createElement('div')
  const iframe = document.createElement('iframe')
  const button = document.createElement('button')
  button.style = `
    color:#fff;
    cursor:pointer;
    background-color:#409eff;
    border:1px solid #dcdfe6;
    box-sizing:border-box;
    padding:8px 12px;
    margin:12px;
    font-size:14px;
    border-radius:4px;
  `
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
      iframe.style = 'width:90vw;height:90vh;border:none;'
      iframe.src = `/common/parseMarked/parseMarked.html?filePath=${filePath}`
      codeContainer.append(iframe)
      isInit = false
    }
    isOpen = true
    button.innerText = '收起代码'
    iframe.style.display = 'block'
  }
  codeContainer.append(button)
  const stx = document.getElementById('stx') || document.body
  stx.append(codeContainer)
}
