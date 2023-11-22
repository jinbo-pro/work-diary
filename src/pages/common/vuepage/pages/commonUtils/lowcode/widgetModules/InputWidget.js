import { BaseWidget } from './BaseWidget'

export class InputWidget extends BaseWidget {
  formItemHtml() {
    return `<el-input v-model.trim="${this.k}" placeholder="请填写${this.title}"></el-input>`
  }
}
