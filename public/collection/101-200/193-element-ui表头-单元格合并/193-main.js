new Vue({
  el: '#app',
  data() {
    return {
      tableData: [
        { type: '水利工程', name: '测试水利工程11', unit: '座' },
        { type: '水利工程', name: '测试水利工程22', unit: '座' },
        { type: '水利工程', name: '测试水利工程33', unit: '座' },
        { type: '水利投资', name: '测试水利投资t-2', unit: '亿元' },
        { type: '水利投资', name: '测试水利投资t-3', unit: '亿元' },
        { type: '水文局资源', name: '测试资源zy-1', unit: '处' },
        { type: '重大项目', name: '重大项目-1', unit: '引大济岷是四川省十四五期规划建设的重大水' }
      ]
    }
  },
  created() {
    this.spanArr = this.dealWithData()
  },
  methods: {
    dealWithData() {
      const key = 'type'
      const result = []
      let pos = 0
      const data = this.tableData
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          result.push(1)
          pos = 0
        } else {
          if (data[i][key] === data[i - 1][key]) {
            result[pos] += 1
            result.push(0)
          } else {
            result.push(1)
            pos = i
          }
        }
      }
      return result
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合并第一列
      if (columnIndex === 0) {
        const rowspan = this.spanArr[rowIndex]
        const colspan = rowspan > 0 ? 1 : 0
        return {
          rowspan,
          colspan
        }
      }
      // 重大项目合并行
      if (row.type == '重大项目') {
        if (columnIndex == 2) {
          return {
            rowspan: 1,
            colspan: 5
          }
        }
      }
    }
  }
})
