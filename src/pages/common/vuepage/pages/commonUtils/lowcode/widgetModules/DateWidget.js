import { BaseWidget } from './BaseWidget'

export class DateWidget extends BaseWidget {
  formItemHtml() {
    return `<el-date-picker v-model="${this.k}" type="date" placeholder="请选择${this.title}"></el-date-picker>`
  }
  formDataRules() {
    return `${this.key}: [{ required: true, message: '请选择${this.title}', trigger: 'change' }],`
  }
}
