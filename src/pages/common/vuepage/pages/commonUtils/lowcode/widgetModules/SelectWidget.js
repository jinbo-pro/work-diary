import { BaseWidget } from './BaseWidget'

export class SelectWidget extends BaseWidget {
  formItemHtml() {
    return `<el-select v-model="${this.k}" placeholder="请选择${this.title}">
    <el-option v-for="(item, index) in selectConfig.${this.key}" :key="index" :label="item.label" :value="item.value">
    </el-option>
  </el-select>`
  }
  formDataRules() {
    return `${this.key}: [{ required: true, message: '请选择${this.title}', trigger: 'change' }],`
  }
  selectDataKey() {
    return `
          ${this.key}: [
            { label: '${this.title}-选项1', value: '${this.key}-1' },
            { label: '${this.title}-选项2', value: '${this.key}-2' },
          ],`
  }
}
