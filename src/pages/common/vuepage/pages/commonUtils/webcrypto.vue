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
            <el-input v-model="aes.key" placeholder="请输入密匙"></el-input>
          </el-form-item>
          <el-form-item label="iv">
            <el-input v-model="aes.iv" placeholder="请输入偏移"></el-input>
          </el-form-item>
          <el-form-item label="通过md5值截取key,iv">
            <el-input v-model="aesMd5" @input="aesSelectMd5" placeholder="请输入偏移"></el-input>
          </el-form-item>
        </el-form>
        <p style="color: #999; font-size: 12px">
          *若密匙和偏移不是16的倍数，那么会自动填充，由于各个平台的填充机制不一样就会导致加密结果不一致，
          为了防止和其他平台加密的结果不一致，强烈建议密匙和偏移均使用16的倍数位如 16位，32位，48位等
        </p>
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
import CardContent from '@/components/CardContent.vue'
import { AES } from '/utils/module/AES.js'
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
      },
      aesMd5: ''
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
      if (key.length < 16) return this.$message.error('请输入密匙且位数应是16的倍数')
      if (iv.length < 16) return this.$message.error('请输入偏移且位数应是16的倍数')
      const a = new AES(key, iv)
      if (type == 'encrypt') {
        if (!this.aes.content) return
        this.aes.encryptedVal = a.encrypt(this.aes.content)
      } else {
        if (!this.aes.encryptedVal) return
        this.aes.content = a.decrypt(this.aes.encryptedVal)
      }
    },
    aesSelectMd5(e) {
      if (!e) return
      const m = CryptoJS.MD5(e).toString()
      this.aes.key = m.slice(0, 16)
      this.aes.iv = m.slice(16)
    }
  }
}
</script>
