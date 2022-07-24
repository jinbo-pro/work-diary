// 工具函数
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
// 创建axios实例
const api = axios.create({
  baseURL: '',
  timeout: 5000
})
api.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code == 0) {
      return res
    } else {
      return Promise.reject(res.message || '操作异常')
    }
  },
  (e) => {
    return Promise.reject('网络异常')
  }
)

new Vue({
  el: '#app',
  data() {
    return {
      fristUpload: true,
      uploadSize: 0,
      fileSizeTotal: 0,
      chunkSize: 2,
      btn: false
    }
  },
  computed: {
    // 上传进度条计算
    uploadProgress() {
      var count = 0
      if (this.fileSizeTotal > 0) {
        count = (this.uploadSize / this.fileSizeTotal) * 100
      }
      return count.toFixed(2) + '%'
    }
  },
  filters: {
    fileSize(val) {
      return (val / 1024).toFixed(2) + 'kb'
    }
  },
  methods: {
    // 0.选择文件
    selectFile(e) {
      let files = e.target.files
      this.changeFile(files[0])
    },
    // 1.创建切片
    async changeFile(file) {
      if (!file) return
      // 解析为BUFFER数据
      // 把文件切片处理：把一个文件分割成为好几个部分（固定数量/固定大小）
      // 每一个切片有自己的部分数据和自己的名字
      // HASH_1.mp4
      // HASH_2.mp4
      // ...
      let buffer = await fileParse(file, 'buffer'),
        spark = new SparkMD5.ArrayBuffer(),
        hash,
        suffix
      spark.append(buffer)
      hash = spark.end()
      suffix = /\.([\w]+)$/i.exec(file.name)[1]

      let i = 0,
        cur = 0,
        partList = [],
        size = file.size,
        partsize = this.chunkSize * 1024 * 1024
      while (size > 0) {
        let currentSize = partsize
        if (size < partsize) {
          currentSize = partsize - size
        }
        let item = {
          chunk: file.slice(cur, cur + currentSize),
          filename: `${hash}_${i++}.${suffix}`
        }
        cur += currentSize
        size -= currentSize
        partList.push(item)
      }
      this.partList = partList
      this.hash = hash
      this.fileSizeTotal = file.size
      this.sendRequest()
    },
    // 2.创建请求合集
    async createRequestList() {
      // 获取一下服务器已有的切片列表，然后只添加服务器没有的切片
      let res = await api.post('/getChunkList', { hash: this.hash })
      let list = []
      if (res.data.length) {
        for (let item of this.partList) {
          if (res.data.includes(item.filename)) {
            // 添加已上传的大小
            if (this.fristUpload) {
              this.uploadSize += item.chunk.size
            }
          } else {
            list.push(item)
          }
        }
      } else {
        list = this.partList
      }
      // 根据切片创建请求参数集合
      let requestList = list.map((item) => {
        let formData = new FormData()
        formData.append('hash', this.hash)
        formData.append('chunk', item.chunk)
        formData.append('filename', item.filename)
        return { ...item, formData }
      })
      return requestList
    },
    // 3.发送文件分片合集
    async sendRequest() {
      let requestList = await this.createRequestList()
      for (let item of requestList) {
        // 已经中断则不再上传
        if (this.abort) return
        // 此处以后可以优化为 多片段并发 使用 promise.all
        await api.post('/single', item.formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.fristUpload = false
        this.uploadSize += item.chunk.size
      }
      // 4.都传完了通知服务器合并文件
      let res = await api.post('/merge', { hash: this.hash })
      console.log(res, '-->>> 文件上传完成')
    },
    // 手动暂停
    handleBtn() {
      if (this.btn) {
        if (this.uploadSize >= this.fileSizeTotal) {
          alert('已经传完了')
          return
        }
        //断点续传
        this.abort = false
        this.btn = false
        this.sendRequest()
      } else {
        //暂停上传
        this.btn = true
        this.abort = true
      }
    }
  }
})
