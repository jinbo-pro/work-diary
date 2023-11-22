import { BaseWidget } from './BaseWidget'

export class DaterangeWidget extends BaseWidget {
  formItemHtml() {
    return `<el-date-picker
    v-model="${this.k}"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  >
  </el-date-picker>`
  }
  formDataRules() {
    return `${this.key}: [{ required: true, message: '请选择${this.title}', trigger: 'change' }],`
  }
}
