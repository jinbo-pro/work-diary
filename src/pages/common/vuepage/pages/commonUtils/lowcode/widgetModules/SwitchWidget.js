import { BaseWidget } from './BaseWidget'

export class SwitchWidget extends BaseWidget {
  formItemHtml() {
    return `<el-switch v-model="${this.k}" :active-value="1" :inactive-value="0"></el-switch>`
  }
  formDataRules() {
    return ''
  }
}
