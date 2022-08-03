console.log('160-pdf发票合并打印')

async function main(files) {
  for (let file of files) {
    const url = URL.createObjectURL(file)
    const pdfFile = await pdfjsLib.getDocument({ url, cMapUrl: './cmaps/' }).promise
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
    $('#container').append(canvas)
  }
}

$('#pdfFile').on('change', function (e) {
  const files = e.target.files
  main(files)
})
$('#print').on('click', function () {
  // $('.box').hide()
  // print()
  // $('.box').show()

  printJS({
    printable: 'container',
    type: 'html',
    targetStyles: ['*'],
    style: '@page{size:auto;margin: 130px 30px 0px 30px;}' //去除页眉页脚
  })
})
