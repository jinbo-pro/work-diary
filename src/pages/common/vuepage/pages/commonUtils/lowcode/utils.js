import { local } from '/utils/storage.js'

let index = local.get('elementFormCreate-index') || 1
/**字段创建 */
export function createField(title, key) {
  index++
  local.set('elementFormCreate-index', index)
  return {
    title: title || `字段_${index}`,
    key: key || `key_${index}`,
    type: 'input',
    isRule: false,
    tableShow: true,
    defaultValue: ''
  }
}
/**创建表单 */
export function createFormItem(type, key, title, formDataName) {
  const k = `${formDataName}.${key}`
  switch (type) {
    case 'inputNumber':
      return `<el-input-number v-model="${k}" :min="1" :max="10" label="${title}"></el-input-number>`
    case 'textarea':
      return `<el-input v-model="${k}" type="textarea" :rows="3" label="${title}"></el-input>`
    case 'switch':
      return `<el-switch v-model="${k}" :active-value="1" :inactive-value="0"></el-switch>`
    case 'date':
      return `<el-date-picker v-model="${k}" type="date" placeholder="请选择${title}"></el-date-picker>`
    case 'daterange':
      return `<el-date-picker
          v-model="${k}"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>`
    case 'select':
      return `<el-select v-model="${k}" placeholder="请选择${title}">
          <el-option v-for="(item, index) in selectConfig.${key}" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>`
    case 'radio':
      return `<el-radio-group v-model="${k}">
          <el-radio v-for="(item, index) in selectConfig.${key}" :key="index" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>`
    default:
      return `<el-input v-model.trim="${k}" placeholder="请填写${title}"></el-input>`
  }
}

const selectType = ['select', 'radio']
/**初始化data */
export function getInitData(config) {
  return `${config.key}: '${config.defaultValue}', // ${config.title}`
}
/**生成 form item */
export function getFormItem(config, formDataName) {
  const { type, key, title } = config
  return `      <el-form-item label="${title}" prop="${key}">
        ${createFormItem(type, key, title, formDataName)}
      </el-form-item>`
}
/**验证配置 */
export function getRule(config) {
  if (!config.isRule) return ''
  const message = `请${selectType.includes(config.type) ? '选择' : '填写'}${config.title}`
  return `${config.key}: [{ required: true, message: '${message}', trigger: 'blur' }],`
}
/**表格展示 */
export function getTable(config) {
  if (!config.tableShow) return ''
  return `<el-table-column prop="${config.key}" label="${config.title}"></el-table-column>`
}
/**下拉列表 */
export function getSelect(config, fillSelect) {
  if (!selectType.includes(config.type)) return ''
  if (!fillSelect) return `${config.key}: [],`
  return `
        ${config.key}: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],`
}

/**获取查询字段 */
export function getFields(config) {
  if (!config.fieldShow) return ''
  return `{ key: '${config.key}', label: '${config.title}', type: 'input' },`
}
/**获取表格展示 */
export function getRowKey(config) {
  if (!config.tableShow) return ''
  return `{ key: '${config.key}', label: '${config.title}' },`
}
