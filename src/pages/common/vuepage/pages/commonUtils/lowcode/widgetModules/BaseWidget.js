export class BaseWidget {
  /**
   * @param {string} formDataName 表单名称
   * @param {string} key 字段
   * @param {string} title 名称
   * @param {string} defaultValue 默认值
   */
  constructor(formDataName, key, title, defaultValue) {
    this.key = key
    this.title = title
    this.defaultValue = defaultValue
    this.formDataName = formDataName
    this.k = `${this.formDataName}.${this.key}`
  }
  /**data字段 */
  initFormKey() {
    return `${this.key}: '${this.defaultValue}', // ${this.title}`
  }
  /**获取表单html */
  formItemHtml() {
    return ''
  }
  /**表单验证 */
  formDataRules(isRule) {
    if (!isRule) return ''
    return `${this.key}: [{ required: true, message: '请填写${this.title}', trigger: 'blur' }],`
  }
  /**表格展示 */
  tableHtml(tableShow) {
    if (!tableShow) return ''
    return `<el-table-column prop="${this.key}" label="${this.title}"></el-table-column>`
  }
  /**下拉列表data */
  selectDataKey() {
    return ''
  }
}
