console.log('161-盘点open打开新窗口那些高级用法')

$('#btn1').on('click', () => {
  window.open('https://www.baidu.com')
})

$('#btn2').on('click', () => {
  const baiduWin = window.open('http://www.baidu.com')
  console.log('百度窗口已经打开 - open')
  const _interal = setInterval(function () {
    if (baiduWin != null && baiduWin.closed) {
      console.log('百度窗口已经关闭 - close')
      clearInterval(_interal)
    }
  }, 30)
})

$('.btn3').on('click', function () {
  const type = $(this).attr('data-type')
  window.open('https://www.baidu.com', type)
})

$('#btn4').on('click', () => {
  /**
   * height=100     窗口高度；
   * width=400      窗口宽度；
   * top=0          窗口距离屏幕上方的像素值；
   * left=0         窗口距离屏幕左侧的像素值；
   * toolbar=no     是否显示工具栏，yes为显示；
   * menubar=no     是否显示菜单栏，yes为显示
   * scrollbars=yes 是否显示滚动栏，yes为显示
   * resizable=no   是否允许改变窗口大小，yes为允许；
   * location=no    是否显示地址栏，yes为允许；
   * status=no      是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
   */
  window.open(
    'https://www.baidu.com',
    '', // 不指定窗口名称则为默认的 _blank
    `
    top=100,
    left=400,
    width=500,
    height=300,
    toolbar=no,
    menubar=no,
    scrollbars=yes,
    resizable=yes,
    location=no,
    status=no
    `
  )
})