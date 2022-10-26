<template>
  <div>
    <el-button type="primary" @click="excelRowDialog = true">Excel列导入</el-button>
    <el-button type="primary" @click="jsonDialog = true">JSON导入</el-button>

    <el-dialog title="Excel列导入" :visible.sync="excelRowDialog" :close-on-click-modal="false" width="750px">
      <el-input v-model="field" type="textarea" placeholder="请输入文本" @blur="excelRowImport"></el-input>
      <span slot="footer">
        <el-button type="primary" @click="excelRowDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="JSON导入" :visible.sync="jsonDialog" :close-on-click-modal="false" width="750px" close>
      <JsonEditor ref="JsonEditor" />
      <span slot="footer">
        <el-button type="primary" @click="jsonImport">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import JsonEditor from '/components/JsonEditor.vue'
import { humpName } from '/utils/collect.js'
import { createField } from './utils.js'
export default {
  name: 'ImportDialog',
  components: {
    JsonEditor
  },
  data() {
    return {
      field: '',
      jsonDialog: false,
      excelRowDialog: false
    }
  },
  methods: {
    // Excel列导入
    excelRowImport() {
      const fieldList = this.field.split('\n').filter((e) => e)
      const tableData = fieldList.map((e) => {
        const [key, title] = e.split('\t')
        return createField(title, humpName(key, '_'))
      })
      this.$emit('change', tableData)
    },
    // json 数据导入
    jsonImport() {
      const fieldList = this.$refs.JsonEditor.getValue()
      console.log(fieldList, 'fieldList')
      if (!Array.isArray(fieldList)) return this.$message.error('数据格式错误')
      this.jsonDialog = false
      const tableData = fieldList.map((e) => Object.assign(createField(), e))
      this.$emit('change', tableData)
    }
  }
}
</script>
