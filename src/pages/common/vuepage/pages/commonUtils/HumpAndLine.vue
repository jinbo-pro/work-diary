<template>
  <div>
    <p>驼峰和连字符转换</p>
    <CardContent title="驼峰" v-model="hump" @blur="humpHandel" />
    <div class="pd-24">
      <el-form :inline="true">
        <el-form-item label="连字类型：">
          <el-select v-model="lineType">
            <el-option label="下划线" value="_"></el-option>
            <el-option label="短横线" value="-"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <CardContent title="连字" v-model="line" @blur="lineHandel" />
  </div>
</template>

<script>
import { humpName, toLowerLine } from '/utils/collect.js'
import CardContent from '@/components/CardContent.vue'
export default {
  components: {
    CardContent
  },
  data() {
    return {
      hump: '',
      line: '',
      lineType: '_'
    }
  },
  methods: {
    humpHandel() {
      this.line = toLowerLine(this.hump, this.lineType)
    },
    lineHandel() {
      this.hump = humpName(this.line, this.lineType)
    }
  }
}
</script>
