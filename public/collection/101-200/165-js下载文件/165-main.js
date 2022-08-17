console.log('165-js下载文件')

function downFileByUrl(imgUrl, fileName) {
  const a = document.createElement('a')
  a.href = imgUrl
  // 默认截取 url 末尾为文件名
  a.download = fileName || imgUrl.split('/').slice(-1)[0]
  a.click()
}

async function downFile(url, fileName) {
  const response = await fetch(url)
  const blob = await response.blob()
  const fileUrl = URL.createObjectURL(blob)
  downFileByUrl(fileUrl, fileName)
}

$('.btn1-1').on('click', function () {
  const imgUrl = '/lib/city_中国城市数据含拼音和经纬度.xlsx'
  downFileByUrl(imgUrl)
})
$('.btn1-2').on('click', function () {
  const imgUrl = '/notepad/vue/从vue2迁移到vue3的变化.md'
  downFileByUrl(imgUrl)
})

$('.btn2-1').on('click', function () {
  const imgUrl = '/assets/img/img0.webp'
  downFileByUrl(imgUrl)
})

const imgUrlOther = 'http://101.43.48.73:39003/images/img3.jpg'
$('.btn2-2').on('click', function () {
  downFileByUrl(imgUrlOther)
})

$('.btn3-1').on('click', function () {
  downFile(imgUrlOther)
})

