import { CodeMirrorEditor } from './CodeMirrorEditor.js'
import { codeTemplateList } from './codeTemplate.js'

const htmlEdit = new CodeMirrorEditor(document.getElementById('html'), 'html')
const cssEdit = new CodeMirrorEditor(document.getElementById('css'), 'css')
const jsEdit = new CodeMirrorEditor(document.getElementById('js'), 'js')

function previewCode(html = '', css = '', js = '', lib = '') {
  const result = document.getElementById('result')
  const iframe = document.createElement('iframe')
  iframe.style.border = 'none'
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  result.innerHTML = ''

  const htmlPageCode = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${lib}
<style>
${css}
</style>
</head>
<body>
${html}
<script type="${js.includes('import') ? 'module' : 'text/javascript'}">
${js}
</script>
</body>
</html>
  `
  const htmlPageFile = new File([htmlPageCode], 'preview.html', { type: 'text/html;charset=utf-8' })
  iframe.src = URL.createObjectURL(htmlPageFile)
  result.append(iframe)
}
/**创建依赖标签 */
function createLibTag(libList) {
  return libList.reduce((p, c) => {
    p += c.endsWith('.js') ? `<script src="${c}"></script>` : `<link rel="stylesheet" href="${c}"/>`
    return p
  }, '')
}

new Vue({
  el: '#app',
  data() {
    return {
      dialogVisible: false,
      temp: '',
      codeTemplateList
    }
  },
  methods: {
    previewHandle() {
      let libStr = ''
      if (this.temp) {
        const cur = codeTemplateList.find((x) => x.name == this.temp)
        libStr = createLibTag(cur.lib)
      }
      previewCode(htmlEdit.getValue(), cssEdit.getValue(), jsEdit.getValue(), libStr)
    },
    templateChange(e) {
      const cur = codeTemplateList.find((x) => x.name == e)
      const { html, css, js } = cur.code
      htmlEdit.setValue(html)
      cssEdit.setValue(css)
      jsEdit.setValue(js)
      previewCode(html, css, js, createLibTag(cur.lib))
    }
  }
})
