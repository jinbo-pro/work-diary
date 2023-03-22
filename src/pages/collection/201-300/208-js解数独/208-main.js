const list = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

function checkCell(i, j, value, list) {
  // 检测行是否有一样的
  if (list[i].includes(value)) return false
  // 检测列是否有一样的
  const colList = list.map((e) => e[j])
  if (colList.includes(value)) false
  // 检测九宫格内是否重复
  let startRow = Math.floor(i / 3) * 3
  let startCol = Math.floor(j / 3) * 3
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (list[i][j] == value) return false
    }
  }

  return true
}

function parserSudoku(list) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (list[i][j] != 0) continue // 不为空位则跳过
      // 尝试数字
      for (let v = 1; v <= 9; v++) {
        if (!checkCell(i, j, v, list)) continue // 不满足条件的值跳过
        // 如果该数符合条件则填入棋盘中
        list[i][j] = v
        // 继续递归查看棋盘其他空位是否符合条件
        const result = parserSudoku(list)
        if (result) return true // 满足条件则跳出当前查询

        // 不满足则清空当前值继续回溯尝试
        list[i][j] = 0
      }
      // 如果尝试完所有的值都不满足条件则返回false
      return false
    }
  }
  // 所有空值都填充完毕则返回 true
  return true
}

new Vue({
  el: '#app',
  data() {
    return {
      dataList: []
    }
  },
  created() {
    this.initList()
  },
  methods: {
    initList() {
      this.dataList = list.map((r) => r.map((c) => (c ? String(c) : '')))
    },
    handle() {
      console.time('time')
      parserSudoku(list)
      console.timeEnd('time')
      this.initList()
    }
  }
})
