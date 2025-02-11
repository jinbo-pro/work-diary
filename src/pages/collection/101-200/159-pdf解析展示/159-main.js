console.log('159-pdf解析展示')

var can = document.getElementById('can')
var currentPages, totalPages //声明一个当前页码及总页数变量
var scale = 2 //设置缩放比例，越大生成图片越清晰

$('#chooseFile').change(function () {
  var pdfFilePath = $('#chooseFile').val()
  if (pdfFilePath) {
    $('#imgloading').css('display', 'block')
    $('#container').empty() //清空上一PDF文件展示图

    currentPages = 1 //重置当前页数
    totalPages = 0 //重置总页数

    var filesdata = $('#chooseFile')[0].files //jquery获取到文件 返回属性的值
    var fileSize = filesdata[0].size //文件大小
    var mb

    if (fileSize) {
      mb = fileSize / 1048576
      if (mb > 10) {
        alert('文件大小不能>10M')
        return
      }
    }

    $('#fileName').text(filesdata[0].name)
    $('#fileSize').text(mb.toFixed(2) + 'Mb')

    var reader = new FileReader()
    reader.readAsDataURL(filesdata[0]) //将文件读取为 DataURL
    reader.onload = function (e) {
      //文件读取成功完成时触发
      pdfjsLib.getDocument(this.result).promise.then(function (pdf) {
        //调用pdf.js获取文件
        if (pdf) {
          totalPages = pdf.numPages //获取pdf文件总页数
          $('#currentPages').text('1/')
          $('#totalPages').text(totalPages)

          //遍历动态创建canvas
          for (var i = 1; i <= totalPages; i++) {
            var canvas = document.createElement('canvas')
            canvas.id = 'pageNum' + i
            $('#container').append(canvas)
            var context = canvas.getContext('2d')
            renderImg(pdf, i, context)
          }
        }
      })
    }
  }
})

//渲染生成图片
function renderImg(pdfFile, pageNumber, canvasContext) {
  pdfFile.getPage(pageNumber).then(function (page) {
    //逐页解析PDF
    var viewport = page.getViewport({ scale }) // 页面缩放比例
    var newcanvas = canvasContext.canvas

    //设置canvas真实宽高
    newcanvas.width = viewport.width
    newcanvas.height = viewport.height

    //设置canvas在浏览中宽高
    newcanvas.style.width = '100%'
    newcanvas.style.height = '100%'

    //默认显示第一页，其他页隐藏
    if (pageNumber != 1) {
      newcanvas.style.display = 'none'
    }

    var renderContext = {
      canvasContext: canvasContext,
      viewport: viewport
    }

    page.render(renderContext) //渲染生成
  })

  $('#imgloading').css('display', 'none')

  return
}

//上一页
$('#prevpage').click(function () {
  if (!currentPages || currentPages <= 1) {
    return
  }

  nowpage = currentPages
  currentPages--

  $('#currentPages').text(currentPages + '/')

  var prevcanvas = document.getElementById('pageNum' + currentPages)
  var currentcanvas = document.getElementById('pageNum' + nowpage)
  currentcanvas.style.display = 'none'
  prevcanvas.style.display = 'block'
})

//下一页
$('#nextpage').click(function () {
  if (!currentPages || currentPages >= totalPages) {
    return
  }

  nowpage = currentPages
  currentPages++

  $('#currentPages').text(currentPages + '/')

  var nextcanvas = document.getElementById('pageNum' + currentPages)
  var currentcanvas = document.getElementById('pageNum' + nowpage)
  currentcanvas.style.display = 'none'
  nextcanvas.style.display = 'block'
})

//导出图片
$('#exportImg').click(function () {
  if (!$('#chooseFile').val()) {
    alert('请先上传pdf文件')
    return false
  }

  $('#imgloading').css('display', 'block')

  var zip = new JSZip() //创建一个JSZip实例
  var images = zip.folder('images') //创建一个文件夹用来存放图片

  //遍历canvas，将其生成图片放进文件夹images中
  $('canvas').each(function (index, ele) {
    var canvas = document.getElementById('pageNum' + (index + 1))

    //将图片放进文件夹images中
    //参数1为图片名称，参数2为图片数据（格式为base64，需去除base64前缀 data:image/png;base64）
    images.file('photo-' + (index + 1) + '.png', splitBase64(canvas.toDataURL('image/png', 1.0)), {
      base64: true
    })
  })

  //打包下载
  zip
    .generateAsync({
      type: 'blob'
    })
    .then(function (content) {
      saveAs(content, 'picture.zip') //saveAs依赖的js文件是FileSaver.js
      $('#imgloading').css('display', 'none')
    })
})

//截取base64前缀
function splitBase64(dataurl) {
  var arr = dataurl.split(',')
  return arr[1]
}

function choosePdf() {
  $('#chooseFile').click()
}
