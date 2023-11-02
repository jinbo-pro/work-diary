import { clickUploadFile } from '@/utils/page.js'
import { xlsxFileToJson } from '@/utils/module/excel/xlsxFileToJson.js'
import { excelExportStyle } from '@/utils/module/excel/excelExportStyle.js'

new Vue({
  el: '#app',
  data() {
    return {
      index: 1,
      jsonStr: '',
      tableData: [],
      rowKey: [],

      xlsname: '',
      dialogVisible: false
    }
  },
  methods: {
    importJson() {
      if (!this.jsonStr) return this.$message.error('请输入json数据')
      try {
        const list = JSON.parse(this.jsonStr)
        this.xlsname = Date.now()
        this.showTableData(list)
      } catch (error) {
        this.$message.error('数据解析失败')
        console.error(error)
      }
    },
    showTableData(list) {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (let key in list[0]) {
        this.rowKey.push({ key, name: key })
      }
      this.tableData = list
    },
    addRow() {
      let newItem = this.rowKey.reduce((p, c) => {
        p[c.key] = Mock.Random.ctitle()
        return p
      }, {})
      this.tableData.push(newItem)
    },
    addCol() {
      this.rowKey.push({
        key: `key_${this.index++}`,
        name: Mock.Random.name()
      })
    },
    exportDataExcel() {
      console.log(this.tableData, '-->>> this.tableData')
      console.log(this.rowKey, '-->>> this.rowKey')
      excelExportStyle('tableData', '数据列表-' + this.xlsname)
    },
    // 导入json文件
    async importJsonFile() {
      const [file] = await clickUploadFile('.json')
      this.xlsname = file.name
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (e) => {
        const text = e.target.result
        try {
          const json = JSON.parse(text)
          this.showTableData(json)
        } catch (error) {
          console.error(error)
          console.log('导入失败！')
        }
      }
    },
    // 导入Excel
    async importXlsxFile() {
      const [file] = await clickUploadFile('.xlsx')
      this.xlsname = file.name
      const res = await xlsxFileToJson(file)
      console.log(res)
      this.rowKey = []
      this.tableData = res
      for (let key in res[0]) {
        this.rowKey.push({ key, name: key })
      }
    }
  }
})
