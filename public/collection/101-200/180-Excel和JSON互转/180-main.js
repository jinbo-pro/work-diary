import { exportHandler } from './display/exportHandler.js'
import { xlsxFileToJson } from './display/xlsxFileToJson.js'

new Vue({
  el: '#app',
  data() {
    return {
      index: 1,
      tableData: [],
      rowKey: [
        { key: 'name', name: '姓名' },
        { key: 'age', name: '年龄' }
      ]
    }
  },
  methods: {
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
      exportHandler({
        list: this.tableData,
        title: false,
        headlist: this.rowKey,
        xlsname: 'test员工列表'
      })
    },
    importXlsxFile(file) {
      xlsxFileToJson(file.raw).then((res) => {
        console.log(res)
        this.rowKey = []
        this.tableData = res
        for (let key in res[0]) {
          this.rowKey.push({ key, name: key })
        }
      })
    }
  }
})
