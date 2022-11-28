// 1. DOMString类型，该请求会自动设置请求头的 Content-Type 为 text/plain
const reportData1 = (url, data) => {
  return navigator.sendBeacon(url, data)
}

// 2. 发送的是Formdata类型，
// 此时该请求会自动设置请求头的 Content-Type 为 multipart/form-data。
const reportData2 = (url, data) => {
  const file = new File([JSON.stringify(data)], 'data.txt', { type: 'text/plain;charset=utf-8' })
  const formData = new FormData()
  formData.append('file', file)
  console.log(file, '-->>> file')
  return navigator.sendBeacon(url, formData)
}

const url = '/api/sendBeacon'

/**页面隐藏时发送统计数据 */
document.addEventListener('visibilitychange', function logData() {
  if (document.visibilityState === 'hidden') {
    const flag = reportData2(url, { name: 'tom', age: 1 })
    /**
     * flag 只能判断出是否放入浏览器任务队列，不能判断是否发送成功
     */
    if (flag) {
      console.log('请求放入任务队列成功')
    }
  }
})

// 手动触发
document.getElementById('btn1').onclick = function () {
  reportData1(url, 'name=jack&age=2')
}
document.getElementById('btn2').onclick = function () {
  reportData2(url, { name: 'tom', age: 1 })
}
