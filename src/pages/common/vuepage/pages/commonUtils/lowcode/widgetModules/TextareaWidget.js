import { BaseWidget } from './BaseWidget'

export class TextareaWidget extends BaseWidget {
  formItemHtml() {
    return `<el-input v-model="${this.k}" type="textarea" :rows="3" label="${this.title}"></el-input>`
  }
}
