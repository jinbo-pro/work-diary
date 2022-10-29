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
