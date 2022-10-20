<template>
  <div>
    <el-button type="primary" @click="excelRowDialog = true">Excel列解析</el-button>
    <el-dialog title="Excel列解析" :visible.sync="excelRowDialog" width="50%">
      <el-input v-model="field" type="textarea" placeholder="请输入文本" @blur="parseField"></el-input>
      <span slot="footer">
        <el-button type="primary" @click="excelRowDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <p>字段生成配置</p>
    <el-button type="primary" @click="addRow">新建字段</el-button>
    <el-button @click="codePrview">代码预览</el-button>
    <el-table :data="tableData">
      <el-table-column label="字段">
        <div slot-scope="{ row }"><el-input v-model="row.key"></el-input></div>
      </el-table-column>
      <el-table-column label="中文名">
        <div slot-scope="{ row }"><el-input v-model="row.title"></el-input></div>
      </el-table-column>
      <el-table-column label="渲染类型">
        <div slot-scope="{ row }">
          <el-select v-model="row.type">
            <el-option v-for="e in renderTypeList" :key="e.value" :label="e.label" :value="e.value"></el-option>
          </el-select>
        </div>
      </el-table-column>
      <el-table-column label="表格展示">
        <div slot-scope="{ row }"><el-switch v-model="row.tableShow"></el-switch></div>
      </el-table-column>
      <el-table-column label="必填">
        <div slot-scope="{ row }"><el-switch v-model="row.required"></el-switch></div>
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
import { humpName } from '/utils/collect.js'
export default {
  data() {
    return {
      field: '',
      index: 1,
      previewUrl: '',
      dialogVisible: false,
      excelRowDialog: false,
      tableData: [],
      renderTypeList: [
        { label: '输入框', value: 'input' },
        { label: '下拉选择', value: 'select' },
        { label: '单选', value: 'radio' }
      ]
    }
  },
  created() {},
  methods: {
    parseField() {
      this.tableData = this.field
        .split('\n')
        .filter((e) => e)
        .map((e) => {
          const [key, title] = e.split('\t')
          return {
            title,
            key: humpName(key, '_'),
            type: 'input',
            required: false,
            tableShow: false
          }
        })
    },
    codePrview() {
      const code = createFormMain(this.tableData)
      this.dialogVisible = true
      const mdFile = new File(['```vue\n' + code + '\n```'], 'code.md', { type: 'text/markdown;charset=utf-8' })
      const filePath = URL.createObjectURL(mdFile)
      this.previewUrl = `/common/parseMarked/parseMarked.html?filePath=${filePath}`
    },
    addRow() {
      this.tableData.push({
        title: '新建字段' + this.index,
        key: 'key' + this.index,
        type: 'input',
        required: false,
        tableShow: false
      })
      this.index++
    },
    deleteRow(row) {
      this.tableData = this.tableData.filter((x) => x.key != row.key)
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
