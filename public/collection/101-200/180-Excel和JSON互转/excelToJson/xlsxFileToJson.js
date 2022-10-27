import { read, utils } from 'https://unpkg.com/xlsx@0.18.5/xlsx.mjs'

/**
 * 表格转json
 * @param {File} file
 */
export function xlsxFileToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 加载文件
    reader.readAsArrayBuffer(file)
    // 文件加载完成后调用
    reader.onload = function (e) {
      const data = e.target.result
      const workbook = read(data, {
        type: 'array'
      })
      const json = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {})
      resolve(json)
      /*
        // 表格存在多个 Sheet 可以使用下标获取数据
        var jsonData1 = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]], {})
        // 如果表格内存在日期，需要处理一下
        for (var i = 0; i < jsonData0.length; i++) {
          jsonData0[i]['日期'] = formatDate(jsonData0[i]['日期'])
        }
      */
    }
    reader.onerror = reject
  })
}
