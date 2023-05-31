<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">生成配置</el-button>
    <el-dialog title="Excel列导入" :visible.sync="dialogVisible" :close-on-click-modal="false" width="550px">
      <el-form ref="formData" :model="formData" label-width="120px">
        <el-form-item label="表单对象名" prop="formDataName">
          <el-input v-model="formData.formDataName" placeholder="请填写表单对象名"></el-input>
        </el-form-item>
        <el-form-item label="页面类型" prop="formType">
          <el-radio-group v-model="formData.formType">
            <el-radio :label="1">普通页面</el-radio>
            <el-radio :label="2">组件集成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="填充下拉" prop="fillSelect">
          <el-switch v-model="formData.fillSelect"></el-switch>
        </el-form-item>
        <el-form-item label="样式表类型" prop="styleLang">
          <el-radio-group v-model="formData.styleLang">
            <el-radio v-for="(item, index) in selectConfig.styleLang" :key="index" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { local } from '@/utils/storage.js'
export default {
  name: 'ConfigDialog',
  data() {
    return {
      dialogVisible: false,
      selectConfig: {
        styleLang: [
          { label: 'less', value: 'less' },
          { label: 'scss', value: 'scss' }
        ]
      },
      formData: {}
    }
  },
  created() {
    this.initFormData()
    const c = local.get('elementFormCreate-ConfigDialog')
    if (c) {
      Object.assign(this.formData, c)
    }
  },
  methods: {
    /**初始化表单对象 */
    initFormData() {
      this.formData = {
        formDataName: 'formData', // 表单对象名
        formType: 2, // 页面类型
        fillSelect: true, // 填充下拉
        styleLang: 'less' // 样式表类型
      }
    },
    onSubmit() {
      local.set('elementFormCreate-ConfigDialog', this.formData)
      this.$emit('change', this.formData)
      this.dialogVisible = false
    }
  }
}
</script>
