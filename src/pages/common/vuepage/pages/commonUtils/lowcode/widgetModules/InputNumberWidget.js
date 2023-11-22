import { BaseWidget } from './BaseWidget'

export class InputNumberWidget extends BaseWidget {
  formItemHtml() {
    return `<el-input-number v-model="${this.k}" :min="1" :max="10" label="${this.title}"></el-input-number>`
  }
}
