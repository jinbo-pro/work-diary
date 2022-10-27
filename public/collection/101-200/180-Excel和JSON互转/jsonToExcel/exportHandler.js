import { utils } from 'https://unpkg.com/xlsx@0.18.5/xlsx.mjs'

/**默认配置 */
const defaultConfig = {
  list: [], // *数据
  title: '', // 标题
  headlist: [], // *表头 { key:string; name:string }
  xlsname: '', // 导出的表格文件名
  /**
   * 单元格合并 左上角成坐标原点 c为x轴 r为y轴 数值为索引数值(0~n)
   * 要合并的单元格配置 { s: { c: 0, r: 0 }, e: { c: 5, r: 0 } }
   */
  merges: [],
  style: {
    // 表头样式
    heade: {
      font: { sz: '14', bold: true },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
    },
    // 表样式
    body: {
      font: { sz: '12', bold: false },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
    }
  }
}
/**
 * buf 数据
 * @param {any} s
 * @returns
 */
function s2ab(s) {
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
/**
 * 保存文件
 * @param {any} obj
 * @param {string} fileName
 */
function saveAs(obj, fileName) {
  let tmpa = document.createElement('a')
  tmpa.download = fileName
  tmpa.href = URL.createObjectURL(obj)
  tmpa.click()
  setTimeout(() => URL.revokeObjectURL(obj), 100)
}
/**
 * 导出
 * @param {any} options
 */
export function exportHandler(options) {
  const config = Object.assign({}, defaultConfig, options)
  const { title, headlist, list, xlsname, merges, style } = config
  let tableData = []
  // 标题
  if (title) {
    merges.push({ s: { c: 0, r: 0 }, e: { c: headlist.length - 1, r: 0 } })
    tableData.push(headlist.map((e) => title))
  }
  // 表头
  const header = headlist.map((e) => e.name)
  tableData.push(header)
  for (let item of list) {
    let values = headlist.map((e) => item[e.key])
    tableData.push(values)
  }
  let ws = utils.aoa_to_sheet(tableData)
  let rows = []
  let cols = []
  for (const key in ws) {
    cols.push({ wpx: 250 })
    rows.push({ hpx: 230 })
    if (key == 'A1') {
      ws[key].s = style.heade
      ws[key].t = 's'
    } else if (!/^!/.test(key)) {
      ws[key].s = style.hs
      ws[key].t = 's'
    }
  }
  ws['!merges'] = merges
  ws['!cols'] = cols
  ws['!rows'] = rows
  let wb = utils.book_new()
  let name = xlsname || 'name.xlsx'
  utils.book_append_sheet(wb, ws, name) // 工作簿名称
  // XLSX.write 来自: xlsx-style@0.8.13
  let tmpDown = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' }))], { type: '' })
  saveAs(tmpDown, name + '.xlsx')
}

/**
 * 使用示例
 * 
const list = [
    { name: '张三', age: 2 },
    { name: '李四', age: 3 }
]
const headlist = [
    { key: 'name', name: '姓名' },
    { key: 'age', name: '年龄' }
]
exportHandler({
    list,
    title: '员工列表',
    headlist,
    xlsname: '员工列表'
})
 */
