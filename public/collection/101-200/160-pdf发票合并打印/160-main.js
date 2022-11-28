console.log('160-pdf发票合并打印')

const container = document.getElementById('container')
async function main(files) {
  for (let file of files) {
    const url = URL.createObjectURL(file)
    /**字体解析文件地址 */
    const cMapUrl = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/'
    const pdfFile = await pdfjsLib.getDocument({ url, cMapUrl }).promise
    // 发票只解析第一页即可
    const page = await pdfFile.getPage(1)
    // 解析PDF
    const viewport = page.getViewport({ scale: 3 }) // 页面缩放比例
    const canvas = document.createElement('canvas')
    canvas.className = 'canvas_box'

    // 设置canvas真实宽高
    canvas.width = viewport.width
    canvas.height = viewport.height

    const context = canvas.getContext('2d')

    // 渲染生成
    page.render({
      canvasContext: context,
      viewport: viewport
    })
    container.append(canvas)
  }
}
document.getElementById('pdfFile').onchange = function (e) {
  const files = e.target.files
  main(files)
}
document.getElementById('print').onclick = function () {
  document.title = new Date().toLocaleDateString().replace(/\//g, '-') + '发票打印'
  printJS({
    printable: 'container',
    type: 'html',
    targetStyles: ['*'],
    style: '@page{size:auto;margin: 0;}' //去除页眉页脚
  })
}
