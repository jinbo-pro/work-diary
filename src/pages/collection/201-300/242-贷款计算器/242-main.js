new Vue({
  el: '#app',
  data() {
    return {
      formData: {
        total: 50,
        rate: 3.75,
        year: 20,
        paymentMethod: 1
      },
      dialogVisible: false,
      tableData: [],
      yearList: [
        { label: '10年（120期）', value: 10 },
        { label: '20年（240期）', value: 20 },
        { label: '30年（360期）', value: 30 }
      ],
      lxze: 0, // 利息总额
      hkze: 0, // 还款总额
      mydj: 0, // 每月递减
      preRepayment: {
        lx: 0,
        ljLx: 0,
        bx: 0,
        ljBx: 0,
        bj: 0,
        ljBj: 0,
        syBj: 0,
        spend: 0
      },
      preRepaymentIndex: 0,
      activeName: 'm',
      chartDialog: false
    }
  },
  computed: {
    showTableData() {
      return this.tableData.map((item) => {
        return Object.keys(item).reduce((p, c) => {
          p[c] = item[c].toFixed(2)
          return p
        }, {})
      })
    },
    showYearTableData() {
      const list = this.tableData
      let result = []
      for (let i = 0, len = list.length; i < len; i += 12) {
        const yearList = list.slice(i, i + 12)
        const sum = (key) => {
          return yearList.reduce((p, c) => {
            p = Number(p) + Number(c[key])
            return p.toFixed(2)
          }, 0)
        }
        const last = yearList[yearList.length - 1]
        result.push({
          lx: sum('lx'),
          ljLx: last.ljLx.toFixed(2),
          bx: sum('bx'),
          ljBx: last.ljBx.toFixed(2),
          bj: sum('bj'),
          ljBj: last.ljBj.toFixed(2),
          syBj: last.syBj.toFixed(2)
        })
      }
      return result
    }
  },
  methods: {
    /**
     * 【等额本金】
     * 等额本金的计算公式为：
     * 每月还本付息金额=（本金/还款月数）+（本金－累计已还本金）×月利率
     * 每月应还本金=贷款本金÷还款月数
     * 每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
     * 每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
     * 总利息=（还款月数+1）×贷款总额×月利率÷2
     */
    componteDEBJ(total, mouths, rate) {
      const result = []
      /**累计本金 */
      let ljBj = 0
      /**累计本息 */
      let ljBx = 0
      /**累计利息 */
      let ljLx = 0
      /**每月本金 */
      const bj = total / mouths
      for (let i = 0; i < mouths; i++) {
        /**每月本息 */
        const bx = total / mouths + (total - ljBj) * rate
        /**每月利息 */
        const lx = bx - bj
        ljBx += bx
        ljLx += lx
        ljBj += bj
        result.push({ lx, ljLx, bx, ljBx, bj, ljBj, syBj: total - ljBj })
      }
      return result
    },
    /**
     * 【等额本息】
     * 等额本金的计算公式为：
     * 每月还本付息金额=[贷款本金×月利率×(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1]
     * 每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
     * 每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
     * 每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
     * 总利息=还款月数×每月月供额-贷款本金
     */
    componteDEBX(total, mouths, rate) {
      const result = []
      /**累计本金 */
      let ljBj = 0
      /**累计本息 */
      let ljBx = 0
      /**累计利息 */
      let ljLx = 0
      /**每月还款 */
      const bx = (total * rate * Math.pow(1 + rate, mouths)) / (Math.pow(1 + rate, mouths) - 1)
      for (let i = 0; i < mouths; i++) {
        /**每月本金 */
        const bj = (total * rate * Math.pow(1 + rate, i)) / (Math.pow(1 + rate, mouths) - 1)
        /**每月利息 */
        const lx = bx - bj
        ljBx += bx
        ljLx += lx
        ljBj += bj
        result.push({ lx, ljLx, bx, ljBx, bj, ljBj, syBj: total - ljBj })
      }
      return result
    },
    onSubmit() {
      const total = this.formData.total * 10000
      const mouths = this.formData.year * 12
      const rate = this.formData.rate / 100 / 12
      if (this.formData.paymentMethod == 1) {
        /**利息总额 */
        this.lxze = (((mouths + 1) * total * rate) / 2).toFixed(2)
        /**还款总额 */
        this.hkze = (Number(this.lxze) + Number(total)).toFixed()
        /**每月递减 */
        this.mydj = ((total / mouths) * rate).toFixed(2)
        this.tableData = this.componteDEBJ(total, mouths, rate)
      } else {
        /**每月还款 */
        const yg = (total * rate * Math.pow(1 + rate, mouths)) / (Math.pow(1 + rate, mouths) - 1)
        /**利息总额 */
        this.lxze = (mouths * yg - total).toFixed(2)
        /**还款总额 */
        this.hkze = (Number(this.lxze) + Number(total)).toFixed()
        /**每月递减 */
        this.mydj = 0
        this.tableData = this.componteDEBX(total, mouths, rate)
      }
    },
    handlePreRepayment(row, index) {
      Object.assign(this.preRepayment, row)
      this.preRepaymentIndex = index + 1
      this.preRepayment.spend = (Number(row.ljBx) + Number(row.syBj)).toFixed(2)
      this.dialogVisible = true
    },
    async showComparisonChart() {
      const xAxisData = []
      const bjData = []
      const lxData = []
      this.showYearTableData.forEach((item, index) => {
        xAxisData.push(index + 1 + '年')
        bjData.push(item.bj)
        lxData.push(item.lx)
      })
      this.chartDialog = true
      await this.$nextTick()
      const myChart = echarts.init(document.getElementById('echartsContainer'))
      const option = {
        title: {
          text: '每年本金利息对比图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['本金', '利息']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本金',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            data: bjData
          },
          {
            name: '利息',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            data: lxData
          }
        ]
      }
      myChart.setOption(option)
    }
  }
})
