<template>
  <div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="md5" name="md5">
        <el-row>
          <el-col :span="12">
            <CardContent title="内容" v-model="md5.de" @blur="handelMd5" />
          </el-col>
          <el-col :span="12">
            <CardContent title="MD5值" :value="md5.en" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="sha1" name="sha1">
        <el-row>
          <el-col :span="12">
            <CardContent title="内容" v-model="sha1.de" @blur="handelsha1" />
          </el-col>
          <el-col :span="12">
            <CardContent title="sha1值" :value="sha1.en" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="aes" name="aes">
        <el-form :inline="true">
          <el-form-item label="key">
            <el-input v-model="aes.key" placeholder="请输入密匙 建议至少8位"></el-input>
          </el-form-item>
          <el-form-item label="iv">
            <el-input v-model="aes.iv" placeholder="请输入偏移 建议至少8位"></el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="12">
            <CardContent title="aes 内容" v-model="aes.content" @blur="aesHandel('encrypt')" />
          </el-col>
          <el-col :span="12">
            <CardContent title="aes 加密" v-model="aes.encryptedVal" @blur="aesHandel('decrypt')" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { loadScript } from '/utils/module/loadScript.js'
loadScript('https://lib.baomitu.com/crypto-js/4.1.1/crypto-js.min.js')
import CardContent from '../../components/CardContent.vue'
import { encrypt, decrypt } from './aes.js'
export default {
  name: 'webcrypto',
  components: {
    CardContent
  },
  data() {
    return {
      activeName: 'md5',
      md5: {
        de: '',
        en: ''
      },
      sha1: {
        de: '',
        en: ''
      },
      aes: {
        key: '',
        iv: '',
        content: '',
        encryptedVal: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // md5
    handelMd5() {
      if (!this.md5.de) return
      this.md5.en = CryptoJS.MD5(this.md5.de).toString()
    },
    // sha1
    handelsha1() {
      if (!this.sha1.de) return
      this.sha1.en = CryptoJS.SHA1(this.sha1.de).toString()
    },
    // aes
    aesHandel(type) {
      const { key, iv } = this.aes
      if (!key) return this.$message.error('请输入密匙')
      if (!iv) return this.$message.error('请输入偏移')
      if (type == 'encrypt') {
        if (!this.aes.content) return
        this.aes.encryptedVal = encrypt(key, iv, this.aes.content)
      } else {
        if (!this.aes.encryptedVal) return
        this.aes.content = decrypt(key, iv, this.aes.encryptedVal)
      }
    }
  }
}
</script>
