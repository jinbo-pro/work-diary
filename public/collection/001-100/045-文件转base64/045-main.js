import { copyText } from '/utils/page.js'

/**base64/buffer 解析 */
function fileParse(file, type = 'base64') {
  return new Promise((resolve) => {
    let fileRead = new FileReader()
    if (type === 'base64') {
      fileRead.readAsDataURL(file)
    } else if (type === 'buffer') {
      fileRead.readAsArrayBuffer(file)
    }
    fileRead.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}

function downFileByUrl(imgUrl, fileName) {
  const a = document.createElement('a')
  a.href = imgUrl
  // 默认截取 url 末尾为文件名
  a.download = fileName || imgUrl.split('/').slice(-1)[0]
  a.click()
}

function getBase64Name(base64) {
  const [n] = base64.split(';')
  return n.replace(/:/, '_').replace(/\//, '.')
}

new Vue({
  el: '#app',
  data() {
    return {
      base64: ''
    }
  },
  computed: {
    isImage() {
      return /^data:image/.test(this.base64)
    }
  },
  methods: {
    selectFile(e) {
      const files = e.target.files
      fileParse(files[0]).then((res) => {
        this.base64 = res
      })
    },
    copy() {
      copyText(this.base64)
      this.$message.success('复制成功')
    },
    base64FileDown() {
      let arr = this.base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      const fileUrl = URL.createObjectURL(blob)
      downFileByUrl(fileUrl, getBase64Name(this.base64))
    }
  }
})
