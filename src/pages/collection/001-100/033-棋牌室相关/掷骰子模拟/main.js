import { diceCom, getRanDice } from '../utils.js'
import { local } from '@/utils/storage.js'
const { Toast, Dialog } = vant
const initMoney = 1000

new Vue({
  el: '#app',
  components: {
    dice: diceCom
  },
  data() {
    return {
      money: local.get('cards-money') || initMoney,
      betting: 10,
      activeType: local.get('cards-activeType') || 'point',
      pointList: [],
      navList: {
        point: { title: '点数', select: '', list: [...'123456'] },
        evenAdd: { title: '单双', select: '', list: ['单', '双'] },
        maxMin: { title: '大小', select: '', list: ['大', '小'] }
      }
    }
  },
  watch: {
    money(v) {
      v && local.set('cards-money', v)
    },
    activeType(v) {
      v && local.set('cards-activeType', v)
    }
  },
  computed: {
    // 总点数
    sumPoint() {
      return this.pointList.reduce((p, c) => {
        p += c
        return p
      }, 0)
    },
    power() {
      return this.activeType == 'point' ? 6 : 2
    },
    winOrLose() {
      return this.power * this.betting
    }
  },
  methods: {
    async getPoint() {
      if (this.money < this.betting) return Toast('资金不足')
      if (!this.navList[this.activeType].select) return Toast('请选择投注')
      await this.setData(this.money - this.betting, 300)
      this.money -= this.betting

      this.pointList = [getRanDice(), getRanDice(), getRanDice()]
      const flag = this.getWinOrLose()
      if (flag) {
        await this.setData(this.money + this.winOrLose)
        this.money += this.winOrLose
      }
    },
    getWinOrLose() {
      const type = this.activeType
      const value = this.navList[type].select
      const dice = this.pointList[0]
      switch (type) {
        case 'point':
          return value == dice
        case 'evenAdd':
          const m = dice % 2
          return (!m && value == '双') || (m && value == '单')
        case 'maxMin':
          return (this.sumPoint > 10 && value == '大') || (this.sumPoint <= 10 && value == '小')
      }
    },
    setData(endVal, duration = 1200) {
      return new Promise((resolve, reject) => {
        const myCountUp = new countUp.CountUp('money', endVal, {
          startVal: this.money,
          duration: duration / 1000
        })
        if (!myCountUp.error) {
          myCountUp.start(resolve)
        } else {
          reject(myCountUp.error)
        }
      })
    },
    async recharge() {
      await Dialog.confirm({ title: '温馨提示', message: '请联系QQ:1564677900' })
      await this.setData(initMoney)
      this.money = initMoney
    }
  }
})
