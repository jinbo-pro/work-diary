console.log('172-算盘表示数字')

// 列数
const maxRow = 11
// 单位
const unitList = ['个', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿']

const strand = {
  name: 'strand',
  template: '#strand',
  props: {
    num: {
      type: Number,
      default: 0
    },
    unit: {
      type: Number,
      default: 0
    }
  },
  computed: {
    state() {
      const n = this.num
      if (n < 5) {
        return { top: 0, down: n }
      } else if (n == 5) {
        return { top: 1, down: 0 }
      } else {
        return { top: 1, down: n - 5 }
      }
    },
    unitStr() {
      return unitList[this.unit] || this.unit
    }
  }
}
new Vue({
  el: '#app',
  components: {
    strand
  },
  data() {
    return {
      count: 258
    }
  },
  computed: {
    countList() {
      return [...String(this.count).padStart(maxRow, '0')].map((e) => Number(e))
    },
    countStr() {
      return Nzh.cn.encodeS(this.count)
    }
  }
})
