# 文件下载

## axios 流文件下载

```js
/**
 * blob 文件流下载
 * @param {Blob} blob
 * @param {string} fileName
 */
function downLoadClick(blob, fileName) {
  const a = document.createElement('a')
  if (fileName) {
    a.download = fileName
  } else {
    a.setAttribute()
  }
  a.style.display = 'none'
  const href = URL.createObjectURL(blob)
  a.href = href
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(href) // 释放URL 对象
  document.body.removeChild(a)
}

axios({
  url: 'xxx/xxx',
  timeout: 8000,
  method: 'post',
  responseType: 'blob',
  headers: { 'content-type': 'application/json;charset=UTF-8' }
}).then((response) => {
  if (!response.headers['content-disposition']) {
    return console.log('content-disposition 未知文件名')
  }
  let fileName = response.headers['content-disposition'].split(';')[1].split('filename=')[1]
  if (fileName) {
    fileName = decodeURIComponent(fileName).replace(/"/g, '')
  }
  const blob = new new Blob([response.data])()
  downLoadClick(blob, fileName)
})
```

## 同域名

如果资源路径和浏览器处在同域的情况下，可直接使用 js 生成一个 a 标签进行下载代码如下

```js
function downFileByUrl(imgUrl, fileName) {
  const a = document.createElement('a')
  a.href = imgUrl
  // 默认截取 url 末尾为文件名
  a.download = fileName || imgUrl.split('/').slice(-1)[0]
  a.click()
}
```

## 不同域

### 不可预览文件

像 xlsx，docx，zip 等格式的文件浏览器无法预览，这种使用上面的 downFileByUrl 也可以直接下载

### 可预览文件

像 图片，视频，音频，PDF 等格式的文件浏览器可以预览，此时若调用上面的 downFileByUrl 浏览器会跳转到该地址进行预览

### 可预览文件的下载方案

- 通过 canvas 保存到本地 - 仅图片类文件可用

```js
function downImgFile(imgUrl, fileName) {
  const image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    const url = canvas.toDataURL('image/png')
    downFileByUrl(url, fileName)
  }
  image.src = imgUrl
}
```

- 通过 ajax 请求获取 blob 文件流，然后下载 - 所有文件通用

  1. XMLHttpRequest 方式下载

  ```js
  function downFile(url, fileName) {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function (res) {
      const blob = this.response
      const fileUrl = URL.createObjectURL(blob)
      downFileByUrl(fileUrl, fileName)
    }
    xhr.send()
  }
  ```

  2. fetch 方式下载

  ```js
  async function downFile(url, fileName) {
    const response = await fetch(url)
    const blob = await response.blob()
    const fileUrl = URL.createObjectURL(blob)
    downFileByUrl(fileUrl, fileName)
  }
  ```
