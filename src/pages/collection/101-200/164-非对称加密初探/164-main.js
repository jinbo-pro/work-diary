import JSEncrypt from 'https://unpkg.com/jsencrypt@3.3.1/lib/index.js'
import { publicKey, privateKey } from './rsaKey.js'
import { copyText } from '@/utils/page.js'

new Vue({
  el: '#app',
  data() {
    return {
      activeName: 'encrypt',
      publicKey: publicKey, // 公钥
      privateKey: privateKey, // 私钥
      content: '', // 原文
      encrypted: '' // 密文
    }
  },
  methods: {
    encryptHandle() {
      if (!this.content) return this.$message.error('请输入原文')

      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(this.publicKey)
      this.encrypted = encrypt.encrypt(this.content)
    },
    decryptHandle() {
      if (!this.encrypted) return this.$message.error('请输入密文')

      const decrypt = new JSEncrypt()
      decrypt.setPrivateKey(this.privateKey)
      this.content = decrypt.decrypt(this.encrypted)
      if (!this.content) return this.$message.error('解密失败')
    },
    copyResult(val) {
      if (!val) return this.$message.error('结果为空')
      copyText(val)
      this.$message.success('复制成功')
    },
    handleTabClick() {
      this.content = ''
      this.encrypted = ''
    }
  }
})
