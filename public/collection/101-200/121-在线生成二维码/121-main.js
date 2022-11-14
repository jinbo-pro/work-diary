new Vue({
  el: '#app',
  data() {
    return {
      content: '',
      codeUrl: '',
      size: 375
    }
  },
  methods: {
    async createQrcode() {
      if (!this.content) return this.$message.error('请输入内容')
      this.codeUrl = await QRCode.toDataURL(this.content, {
        width: this.size,
        height: this.size,
        margin: 1
      })
    },
    save() {
      if (!this.codeUrl) {
        return this.$message.error('未生成二维码')
      }
      let a = document.createElement('a')
      a.href = this.codeUrl
      a.download = '二维码'
      a.click()
      this.$message.success('下载成功')
    }
  }
})
