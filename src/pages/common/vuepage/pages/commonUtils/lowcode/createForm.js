import { widgetModes } from './widgetModules/index'
import { BaseWidget } from './widgetModules/BaseWidget'

/**
 * 创建表单
 * @param {any[]} fieldList
 * @param {any} options
 * @returns
 */
function createElFormMain(fieldList, options) {
  const { formDataName, styleLang } = options
  const code = {
    formStr: [],
    tableStr: [],
    initForm: [],
    selectConfig: [],
    rulesStr: []
  }

  for (let config of fieldList) {
    const Widget = widgetModes[config.type]
    if (!Widget) {
      console.log(`${config.type} 未配置对应组件渲染器`)
      continue
    }
    /**@type {BaseWidget} */
    const node = new Widget(formDataName, config.key, config.title, config.defaultValue)
    code.initForm.push(node.initFormKey())
    const formHtml = `      <el-form-item label="${node.title}" prop="${node.key}">
        ${node.formItemHtml()}
      </el-form-item>`
    code.formStr.push(formHtml)
    code.selectConfig.push(node.selectDataKey())
    code.tableStr.push(node.tableHtml(config.tableShow))
    code.rulesStr.push(node.formDataRules(config.isRule))
  }
  for (let key in code) {
    code[key] = code[key].filter((x) => x).join('\n')
  }

  return `
<template>
  <div>
    <el-button type="primary" @click="openAddDialog">新建</el-button>
    <el-table :data="tableData">
${code.tableStr}
      <el-table-column label="操作">
        <div slot-scope="{ row }">
          <el-button type="primary" @click="editRow(row)">编辑</el-button>
          <el-button type="danger" @click="deleteRow(row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%">
      <el-form ref="${formDataName}" :model="${formDataName}" ${
    code.rulesStr ? ':rules="formDataRules"' : ''
  } label-width="80px">
${code.formStr}
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
      editType: false,
      dialogVisible: false,
      selectConfig: {
${code.selectConfig}
      },
      tableData: [],
      ${formDataName}: {},
      formDataRules: {
${code.rulesStr}
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.editType ? '编辑表单' : '新增表单'
    }
  },
  created() {
    this.initFormData()
  },
  methods: {
    /**初始化表单对象 */
    initFormData() {
      this.${formDataName} = {
${code.initForm}
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
      this.initFormData()
      this.editType = false
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.${formDataName}.resetFields()
    },
    /**新增/编辑提交 */
    onSubmit() {
      this.$refs.${formDataName}.validate(async (valid) => {
        if (!valid) return
        if (this.editType) {
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
      this.editType = true
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

/**
 * 生成表单
 * @param {any[]} fieldList
 * @param {any} options
 * @returns
 */
export function createFormMain(fieldList, options) {
  return createElFormMain(fieldList, options)
}
