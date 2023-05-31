import { countFileSize } from '@/utils/collect'
import { clickUploadFile, fileParse } from '@/utils/page.js'

new Vue({
  el: '#app',
  data() {
    return {
      md5: '',
      sha256: '',

      duration: {
        md5: '',
        sha256: ''
      },
      file: {
        name: '',
        size: ''
      }
    }
  },
  filters: {
    formatTime(v) {
      return v ? (v / 1000).toFixed(2) + '秒' : ''
    }
  },
  methods: {
    async handel() {
      const files = await clickUploadFile()
      const [file] = files
      this.file.name = file.name
      this.file.size = countFileSize(file.size)

      const buffer = await fileParse(file, 'buffer')

      const s = Date.now()
      const spark = new SparkMD5.ArrayBuffer()
      spark.append(buffer)
      this.md5 = spark.end()
      const e1 = Date.now()

      this.sha256 = sha256(buffer)
      const e2 = Date.now()

      this.duration.md5 = e1 - s
      this.duration.sha256 = e2 - e1
    }
  }
})
