import { BaseWidget } from './BaseWidget'

export class RadioWidget extends BaseWidget {
  formItemHtml() {
    return `<el-radio-group v-model="${this.k}">
    <el-radio v-for="(item, index) in selectConfig.${this.key}" :key="index" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>`
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
