<template>
  <div>
    <p>URI 编码格式</p>
    <el-row>
      <el-col :span="12">
        <CardContent title="decodeURI 解码" v-model="code.de" @blur="handelCode('de')" />
      </el-col>
      <el-col :span="12">
        <CardContent title="encodeURI 编码" v-model="code.en" @blur="handelCode('en')" />
      </el-col>
    </el-row>
    <p>URIComponent 编码格式</p>
    <el-row>
      <el-col :span="12">
        <CardContent title="decodeURIComponent 解码" v-model="codeComponent.de" @blur="handelCodeComponent('de')" />
      </el-col>
      <el-col :span="12">
        <CardContent title="decodeURIComponent 编码" v-model="codeComponent.en" @blur="handelCodeComponent('en')" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CardContent from '@/components/CardContent.vue'
export default {
  components: {
    CardContent
  },
  data() {
    return {
      code: {
        de: '',
        en: ''
      },
      codeComponent: {
        de: '',
        en: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 编码
    handelCode(type) {
      if (type == 'de') {
        this.code.en = decodeURI(this.code.de)
      } else {
        this.code.de = encodeURI(this.code.en)
      }
    },
    // 编码 Component
    handelCodeComponent(type) {
      if (type == 'de') {
        this.codeComponent.en = decodeURIComponent(this.codeComponent.de)
      } else {
        this.codeComponent.de = encodeURIComponent(this.codeComponent.en)
      }
    }
  }
}
</script>
