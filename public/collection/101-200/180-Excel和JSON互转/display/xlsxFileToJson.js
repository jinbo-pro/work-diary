import { read, utils } from 'https://unpkg.com/xlsx@0.18.5/xlsx.mjs'
import { parse } from 'https://unpkg.com/csv-parse@5.3.1/dist/esm/index.js'

function CSVToJSON(csv, rowsToSkip, allowEmptyKey) {
  return new Promise((resolve, reject) => {
    let records = []
    let header = []
    let index = 0
    const parser = parse(csv)
    parser
      .on('readable', () => {
        let record = parser.read()
        if (!record) return
        if (index === rowsToSkip) {
          header = record
        } else if (index > rowsToSkip) {
          var obj = {}
          header.forEach((column, index) => {
            if (!allowEmptyKey && !column.trim()) {
              return
            }
            obj[column.trim()] = record[index].trim()
          })
          records.push(obj)
        }
        index++
      })
      .on('end', () => resolve(records))
      .on('error', reject)
  })
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function (e) {
      resolve(e.target.result)
    }
    reader.onerror = reject
  })
}

/**
 * 表格转json
 * @param {File} file
 * @param {any} config
 */
export async function xlsxFileToJson(file, config = {}) {
  // config 配置参考： https://www.npmjs.com/package/xls-to-json
  const { sheet, rowsToSkip = 0, allowEmptyKey = true } = config
  const data = await readFile(file)
  const wb = read(data, { type: 'array' })
  const ws = wb.Sheets[sheet || wb.SheetNames[0]]
  /**
   * 以下方法也可以直接得到json数据，但是单元格没有数据得到的数据键就不完整，采用csv-parse可得到更理想的数据结构
   * utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]], {})
   */
  const csv = utils.sheet_to_csv(ws)
  const json = await CSVToJSON(csv, rowsToSkip, allowEmptyKey)
  return json
}
