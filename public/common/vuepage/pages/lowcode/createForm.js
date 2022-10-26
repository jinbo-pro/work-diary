function createFormItem(type, key, title, formDataName) {
  const k = `${formDataName}.${key}`
  switch (type) {
    case 'inputNumber':
      return `<el-input-number v-model="${k}" :min="1" :max="10" label="${title}"></el-input-number>`
    case 'textarea':
      return `<el-input v-model="${k}" type="textarea" :rows="3" label="${title}"></el-input>`
    case 'switch':
      return `<el-switch v-model="${k}" :active-value="1" :inactive-value="0"></el-switch>`
    case 'date':
      return `<el-date-picker v-model="${k}" type="date" placeholder="请选择${title}"></el-date-picker>`
    case 'daterange':
      return `<el-date-picker
          v-model="${k}"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>`
    case 'select':
      return `<el-select v-model="${k}" placeholder="请选择${title}">
          <el-option v-for="(item, index) in selectConfig.${key}" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>`
    case 'radio':
      return `<el-radio-group v-model="${k}">
          <el-radio v-for="(item, index) in selectConfig.${key}" :key="index" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>`
    default:
      return `<el-input v-model.trim="${k}" placeholder="请填写${title}"></el-input>`
  }
}

const selectType = ['select', 'radio']
/**初始化data */
function getInitData(config) {
  return `${config.key}: '${config.defaultValue}', // ${config.title}`
}
/**生成 form item */
function getFormItem(config, formDataName) {
  const { type, key, title } = config
  return `      <el-form-item label="${title}" prop="${key}">
        ${createFormItem(type, key, title, formDataName)}
      </el-form-item>`
}
/**验证配置 */
function getRule(config) {
  if (!config.isRule) return ''
  const message = `请${selectType.includes(config.type) ? '选择' : '填写'}${config.title}`
  return `${config.key}: [{ required: true, message: '${message}', trigger: 'blur' }],`
}
/**表格展示 */
function getTable(config) {
  if (!config.tableShow) return ''
  return `<el-table-column prop="${config.key}" label="${config.title}"></el-table-column>`
}
/**下拉列表 */
function getSelect(config, fillSelect) {
  if (!selectType.includes(config.type)) return ''
  if (!fillSelect) return `${config.key}: [],`
  return `
        ${config.key}: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],`
}

/**
 * 创建表单
 * @param {any[]} fieldList
 * @param {any} options
 * @returns
 */
export function createFormMain(fieldList, options) {
  const { formDataName, fillSelect, styleLang } = options
  const comToString = (fn, params) => {
    const strList = fieldList.map((e) => fn(e, params)).filter((e) => e)
    return strList.join('\n')
  }
  const formStr = comToString(getFormItem, formDataName)
  const tableStr = comToString(getTable)
  const initForm = comToString(getInitData)
  const selectConfig = comToString(getSelect, fillSelect)
  const rulesStr = comToString(getRule)
  return `
<template>
  <div>
    <el-button type="primary" @click="openAddDialog">新建</el-button>
    <el-table :data="tableData">
${tableStr}
      <el-table-column label="操作">
        <div slot-scope="{ row }">
          <el-button type="primary" @click="editRow(row)">编辑</el-button>
          <el-button type="danger" @click="deleteRow(row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%">
      <el-form ref="${formDataName}" :model="${formDataName}" ${
    rulesStr ? ':rules="formDataRules"' : ''
  } label-width="80px">
${formStr}
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { xxx_delete, xxx_getById, xxx_getPage, xxx_insert, xxx_update } from '@/apiList/xxx.js'
export default {
  data() {
    return {
      isEdit: false,
      dialogVisible: false,
      selectConfig: {
${selectConfig}
      },
      tableData: [],
      ${formDataName}: {},
      formDataRules: {
${rulesStr}
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.isEdit ? '编辑表单' : '新增表单'
    }
  },
  created() {
    this.initFormData()
  },
  methods: {
    /**初始化表单对象 */
    initFormData() {
      this.${formDataName} = {
${initForm}
      }
    },
    /**获取数据列表 */
    getList() {
      console.log(123, 'getList')
      xxx_getPage().then((res) => {
        this.tableData = res
      })
    },
    /**新增弹窗 */
    async openAddDialog() {
      this.isEdit = false
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.${formDataName}.resetFields()
    },
    /**新增/编辑提交 */
    onSubmit() {
      this.$refs.${formDataName}.validate(async (valid) => {
        if (!valid) return
        if (this.isEdit) {
          await xxx_update(this.${formDataName})
        } else {
          await xxx_insert(this.${formDataName})
        }
        this.dialogVisible = false
        this.getList()
      })
    },
    /**编辑 */
    async editRow(row) {
      this.isEdit = true
      const info = await xxx_getById({ id: row.id })
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.${formDataName}.resetFields()
      Object.assign(this.${formDataName}, info)
    },
    /**删除 */
    async deleteRow(row) {
      await this.$confirm('确认删除吗?', '提示', { type: 'warning' })
      await xxx_delete({ id: row.id })
      this.$message.success('操作成功')
      this.getList()
    }
  }
}
</script>

<style lang="${styleLang}" scoped></style>
  `
}
