import { getFields, getFormItem, getInitData, getRowKey, getRule, getSelect, getTable } from './utils.js'

/**
 * 创建表单
 * @param {any[]} fieldList
 * @param {any} options
 * @returns
 */
function createElFormMain(fieldList, options) {
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
      editType: false,
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
 * 创建带组件的表单
 * @param {any[]} fieldList
 * @param {any} options
 * @returns
 */
function createQuikeForm(fieldList, options) {
  const { formDataName, fillSelect, styleLang } = options
  const comToString = (fn, params) => {
    const strList = fieldList.map((e) => fn(e, params)).filter((e) => e)
    return strList.join('\n')
  }
  const formStr = comToString(getFormItem, formDataName)
  const initForm = comToString(getInitData)
  const selectConfig = comToString(getSelect, fillSelect)
  const rulesStr = comToString(getRule)
  const fieldsStr = comToString(getFields)
  const rowKeysStr = comToString(getRowKey)
  return `
<template>
  <div>
    <div class="oa_card_bd">
      <SearchForm labelWidth="100px" :fields="fields" ref="SearchForm" @searchList="searchList" />
    </div>
    <div class="line_bgc"></div>
    <PagerTabel
      :page.sync="currentPage"
      :total="total"
      showBut="add,reload,edit,del"
      @add="addOpenDialog"
      @edit="editRow"
      @del="deleteRow"
      @reload="getList"
      @pagination="getList"
      :rowKey="rowKey"
      :tableData="tableData"
    >
      <template slot="table_last">
        <el-table-column label="操作" width="60px">
          <div slot-scope="{ row }">
          <el-button type="primary" @click="lookRowInfo(row)">查看详情</el-button>
          </div>
        </el-table-column>
      </template>
    </PagerTabel>

    <el-dialog top="5vh" :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%">
      <el-form ref="${formDataName}" :model="${formDataName}" ${
    rulesStr ? ':rules="formDataRules"' : ''
  } label-width="80px" :disabled="editType == 3">
${formStr}
      </el-form>
      <div v-if="editType < 3" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PagerTabel from '@/components/common/PagerTabel'
import SearchForm from '@/components/common/SearchForm'
// import { xxx_delete, xxx_getById, xxx_getPage, xxx_insert, xxx_update } from '@/apiList/xxx.js'
export default {
  components: {
    PagerTabel,
    SearchForm
  },
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      fields: [
${fieldsStr}
      ],
      rowKey: [
${rowKeysStr}
      ],
      editType: 1,
      dialogVisible: false,
      selectConfig: {
${selectConfig}
      },
      ${formDataName}: {},
      formDataRules: {
${rulesStr}
      }
    }
  },
  computed: {
    dialogTitle() {
      const t = this.editType
      return t == 1 ? '新增' : t == 2 ? '编辑' : '查看'
    }
  },
  created() {
    this.initFormData()
  },
  mounted() {
    this.getList()
  },
  methods: {
    /**初始化表单对象 */
    initFormData() {
      this.${formDataName} = {
${initForm}
      }
    },
    /**搜索 */
    searchList() {
      this.currentPage = 1
      this.getList()
    },
    /**获取数据列表 */
    async getList() {
      let searchData = this.$refs.SearchForm.getSearchParams()
      let page = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      let res = await xxx_getPage({
        ...page,
        ...searchData
      })
      this.total = res ? res.total : 0
      this.tableData = res && res.list ? res.list : []
    },
    /**新增弹窗 */
    async addOpenDialog() {
      this.editType = 1
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.${formDataName}.resetFields()
    },
    /**新增/编辑提交 */
    onSubmit() {
      this.$refs.${formDataName}.validate(async (valid) => {
        if (!valid) return
        if (this.editType == 2) {
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
      this.editType = 2
      const info = await xxx_getById({ id: row.id })
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.${formDataName}.resetFields()
      Object.assign(this.${formDataName}, info)
    },
    /**删除 */
    async deleteRow([row]) {
      await this.$confirm('确认删除吗?', '提示', { type: 'warning' })
      await xxx_delete({ id: row.id })
      this.$message.success('操作成功')
      this.getList()
    },
    /**查看详情 */
    async lookRowInfo(row) {
      this.editType = 3
      const info = await api.getById({ id: row.id })
      this.dialogVisible = true
      await this.$nextTick()
      Object.assign(this.formData, info)
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
  return options.formType == 1 ? createElFormMain(fieldList, options) : createQuikeForm(fieldList, options)
}
