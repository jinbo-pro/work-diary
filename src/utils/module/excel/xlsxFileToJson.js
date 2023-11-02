import { read, utils } from 'https://unpkg.com/xlsx@0.18.5/xlsx.mjs'
import { loadScript } from '@/utils/module/loadScript.js'

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
 */
export async function xlsxFileToJson(file) {
  await loadScript('https://cdn.staticfile.org/PapaParse/5.4.1/papaparse.min.js')
  const data = await readFile(file)
  const wb = read(data, { type: 'array' })
  const ws = wb.Sheets[wb.SheetNames[0]]
  /**
   * 以下方法也可以直接得到json数据，但是单元格没有数据得到的数据键就不完整，采用csv-parse可得到更理想的数据结构
   * utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]], {})
   */
  const csv = utils.sheet_to_csv(ws)
  // papaparse: https://www.papaparse.com/
  const res = Papa.parse(csv, { header: true, auto_parse: true })
  return res.data
}
