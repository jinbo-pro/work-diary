<template>
  <div>
    <p>字段</p>
    <el-input v-model="field" type="textarea" placeholder="请输入字段" @blur="parseField"></el-input>
    <p>解析结果</p>
    <el-button type="primary" @click="codePrview">代码预览</el-button>
    <el-table :data="tableData">
      <el-table-column prop="key" label="字段"> </el-table-column>
      <el-table-column prop="title" label="中文名"> </el-table-column>
      <el-table-column label="渲染类型">
        <div slot-scope="{ row }">
          <el-select v-model="row.type">
            <el-option v-for="e in renderTypeList" :key="e.value" :label="e.label" :value="e.value"></el-option>
          </el-select>
        </div>
      </el-table-column>
      <el-table-column label="表格展示">
        <div slot-scope="{ row }">
          <el-switch v-model="row.tableShow"></el-switch>
        </div>
      </el-table-column>
      <el-table-column label="必填">
        <div slot-scope="{ row }">
          <el-switch v-model="row.required"></el-switch>
        </div>
      </el-table-column>
    </el-table>
    <el-dialog top="5vh" title="代码预览" :visible.sync="dialogVisible" width="100%">
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
      previewUrl: '',
      dialogVisible: false,
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
    }
  }
}
</script>

<style lang="less" scoped>
.pre_box {
  width: 90vw;
  height: 500px;
}
</style>
