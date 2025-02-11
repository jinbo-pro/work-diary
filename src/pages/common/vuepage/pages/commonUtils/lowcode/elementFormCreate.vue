<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="配置：">
        <ConfigDialog ref="config" />
      </el-form-item>
      <el-form-item label="导入：">
        <ImportDialog @change="importTableData" />
      </el-form-item>
      <el-form-item label="导出：">
        <el-button @click="exportJsonConfig">导出json配置</el-button>
      </el-form-item>
      <el-form-item label="操作：">
        <el-button size="mini" type="warning" @click="clearList">清空字段</el-button>
      </el-form-item>
    </el-form>

    <p>字段生成配置</p>
    <div>
      <el-button type="primary" @click="addRow">新建字段</el-button>
      <el-button type="success" @click="codePrview">代码预览</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column label="字段">
        <div slot-scope="{ row }"><el-input v-model.trim="row.key"></el-input></div>
      </el-table-column>
      <el-table-column label="中文名">
        <div slot-scope="{ row }"><el-input v-model.trim="row.title"></el-input></div>
      </el-table-column>
      <el-table-column label="渲染类型">
        <div slot-scope="{ row }">
          <el-select v-model="row.type">
            <el-option v-for="e in renderTypeList" :key="e.value" :label="e.label" :value="e.value"></el-option>
          </el-select>
        </div>
      </el-table-column>
      <el-table-column label="默认值">
        <div slot-scope="{ row }"><el-input v-model.trim="row.defaultValue"></el-input></div>
      </el-table-column>
      <el-table-column label="表格展示">
        <div slot-scope="{ row }"><el-switch v-model="row.tableShow"></el-switch></div>
      </el-table-column>
      <el-table-column label="必填">
        <div slot-scope="{ row }"><el-switch v-model="row.isRule"></el-switch></div>
      </el-table-column>
      <el-table-column label="操作">
        <div slot-scope="{ row }">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(row)"></el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-dialog top="5vh" title="代码预览" :visible.sync="dialogVisible" width="99vw">
      <iframe v-if="previewUrl" :src="previewUrl" frameborder="0" class="pre_box"></iframe>
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createFormMain } from './createForm.js'
import { local } from '@/utils/storage.js'
import { createField } from './utils.js'
import ConfigDialog from './ConfigDialog.vue'
import ImportDialog from './ImportDialog.vue'
export default {
  components: {
    ConfigDialog,
    ImportDialog
  },
  data() {
    return {
      formType: 2,
      previewUrl: '',
      dialogVisible: false,
      tableData: [],
      renderTypeList: [
        { label: '输入框', value: 'InputWidget' },
        { label: '文字域', value: 'TextareaWidget' },
        { label: '下拉选择', value: 'SelectWidget' },
        { label: '日期', value: 'DateWidget' },
        { label: '日期范围', value: 'DaterangeWidget' },
        { label: '开关', value: 'SwitchWidget' },
        { label: '单选', value: 'RadioWidget' },
        { label: '数字输入框', value: 'InputNumberWidget' }
      ]
    }
  },
  created() {
    this.tableData = local.get('elementFormCreate-tableData') || []
  },
  methods: {
    // 代码预览
    codePrview() {
      const code = createFormMain(this.tableData, this.$refs.config.formData)
      this.dialogVisible = true
      const mdFile = new File(['```vue\n' + code + '\n```'], 'code.md', { type: 'text/markdown;charset=utf-8' })
      const filePath = URL.createObjectURL(mdFile)
      this.previewUrl = `/pages/common/parseMarked/parseMarked.html?filePath=${filePath}`
      this.saveTableData(this.tableData)
    },
    addRow() {
      this.tableData.push(createField())
    },
    deleteRow(row) {
      this.tableData = this.tableData.filter((x) => x.key != row.key)
    },
    // 导入配置
    importTableData(tableData) {
      console.log(tableData, 'tableData')
      this.tableData = tableData
    },
    // 保存生成字段配置
    saveTableData(tableData) {
      console.log(tableData, 'tableData')
      local.set('elementFormCreate-tableData', tableData)
    },
    async clearList() {
      await this.$confirm('确认清空所有字段吗？', '提示', { type: 'warning' })
      this.tableData = []
    },
    exportJsonConfig() {
      const fileName = `elementFormCreate-config-${Date.now()}.txt`
      const file = new File([JSON.stringify(this.tableData)], fileName, { type: 'text/plain;charset=utf-8' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(file)
      a.download = fileName
      a.click()
    }
  }
}
</script>

<style lang="less" scoped>
.pre_box {
  width: 95vw;
  height: 80vh;
}
</style>
