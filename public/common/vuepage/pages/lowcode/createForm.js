function createFormItem(item) {
  switch (item.type) {
    case 'inputNumber':
      return `<el-input-number v-model="formData.${item.key}" :min="1" :max="10" label="${item.title}"></el-input-number>`
    case 'switch':
      return `<el-switch v-model="formData.${item.key}" :active-value="1" :inactive-value="0"></el-switch>`
    case 'date':
      return `<el-date-picker v-model="formData.${item.key}" type="date" placeholder="请选择${item.title}"></el-date-picker>`
    case 'daterange':
      return `
      <el-date-picker
        v-model="formData.${item.key}"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>`
    case 'select':
      return `
      <el-select v-model="formData.${item.key}" placeholder="请选择${item.title}">
        <el-option v-for="(item, index) in selectConfig.${item.key}" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>`
    case 'radio':
      return `
      <el-radio-group v-model="formData.${item.key}">
        <el-radio v-for="(item, index) in selectConfig.${item.key}" :key="index" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>`
    default:
      return `<el-input v-model="formData.${item.key}" placeholder="请填写${item.title}"></el-input>`
  }
}

export function createFormMain(fieldList) {
  let str = ''
  let table = ''
  let initForm = ''
  let selectConfig = ''
  const rules = {}
  for (let item of fieldList) {
    str += `
    <el-form-item label="${item.title}" prop="${item.key}">
      ${createFormItem(item)}
    </el-form-item>`
    initForm += `
          ${item.key}: '', // ${item.title}`

    selectConfig +=
      item.type == 'select' || item.type == 'radio'
        ? `
          ${item.key}: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
          ],`
        : ''
    if (item.required) {
      rules[item.key] = [{ required: true, message: `请填写${item.title}`, trigger: 'blur' }]
    }
    if (item.tableShow) {
      table += `
      <el-table-column prop="${item.key}" label="${item.title}"></el-table-column>`
    }
  }

  const isRule = Object.keys(rules).length
  return `
<template>
  <div>
    <el-button type="primary" @click="openAddDialog">新建</el-button>
    <el-table :data="tableData">
      ${table}
      <el-table-column label="操作">
        <div slot-scope="{ row }">
          <el-button type="primary" @click="editRow(row)">编辑</el-button>
          <el-button type="danger" @click="deleteRow(row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>

    <el-dialog title="表单操作弹窗" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%">
      <el-form ref="formData" :model="formData" ${isRule ? ':rules="formDataRules"' : ''} label-width="80px">
        ${str}
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        selectConfig: {
          ${selectConfig}
        },
        tableData: [],
        formData: {},
        formDataRules: ${JSON.stringify(rules)}
      }
    },
    created() {
      this.initFormData()
    },
    methods: {
      initFormData() {
        this.formData = {
          ${initForm}
        }
      },
      openAddDialog() {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.formData.resetFields()
        })
      },
      onSubmit() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            alert('submit!')
            this.dialogVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      editRow(row) {
        console.log(row, 'editRow')
      },
      deleteRow(row) {
        console.log(row, 'editRow')
      }
    }
  }
</script>

<style lang="less" scoped></style>
  `
}
