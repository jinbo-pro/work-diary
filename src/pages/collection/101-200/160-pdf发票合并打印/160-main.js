import { arrayChunk } from '@/utils/collect.js'

new Vue({
  el: '#app',
  data() {
    return {
      dialogVisible: false,
      isPrint: false,
      direction: 1,
      viewCount: 2,
      w: 770,
      h: 1030
    }
  },
  watch: {
    direction(v) {
      const printStyle = document.getElementById('printStyle')
      if (v == 1) {
        this.w = 700
        this.h = 1030
        printStyle.innerHTML = '@page {margin: 0;size: portrait;}'
      } else {
        this.w = 1200
        this.h = 800
        printStyle.innerHTML = '@page {margin: 0;size: landscape;}'
      }
    }
  },
  methods: {
    async selectFile(e) {
      const container = document.getElementById('container')
      const pageList = arrayChunk(Array.from(e.target.files), this.viewCount)
      for (let page of pageList) {
        const pdfDom = await this.parsePdf(page)
        container.append(pdfDom)
      }
    },
    async parsePdf(page) {
      const div = document.createElement('div')
      div.className = 'view'
      div.style.width = this.w + 'px'
      div.style.height = this.h + 'px'
      for (let file of page) {
        const url = URL.createObjectURL(file)
        /**字体解析文件地址 */
        const cMapUrl = 'https://unpkg.com/pdfjs-dist@3.7.107/cmaps/'
        const pdfFile = await pdfjsLib.getDocument({ url, cMapUrl }).promise
        // 发票只解析第一页即可
        const page = await pdfFile.getPage(1)
        // 解析PDF
        const viewport = page.getViewport({ scale: 3 }) // 页面缩放比例
        const canvas = document.createElement('canvas')

        // 设置canvas真实宽高
        canvas.width = viewport.width
        canvas.height = viewport.height

        const p = viewport.width / viewport.height
        let cw = viewport.width
        let ch = viewport.height

        if (this.viewCount == 1) {
          cw = this.w
          ch = this.w / p
        } else if (this.viewCount == 2) {
          const h = this.h / 2 - 20
          cw = h * p
          ch = h
        } else {
          const w = this.w / 2 - 20
          cw = w
          ch = w / p
        }
        canvas.style.width = cw + 'px'
        canvas.style.height = ch + 'px'
        const context = canvas.getContext('2d')

        // 渲染生成
        page.render({
          canvasContext: context,
          viewport: viewport
        })
        div.append(canvas)
      }
      return div
    },
    async printHandle() {
      document.title = new Date().toLocaleDateString().replace(/\//g, '-') + '发票打印'
      this.isPrint = true
      await this.$nextTick()
      print()
      this.isPrint = false
    }
  }
})
