new Vue({
  el: '#app',
  data() {
    return {
      money: 0,
      currentDate: 1,
      accountList: [],
      user: {
        name: '匿名',
        initMoney: 100,
        rate: 0.3
      }
    }
  },
  methods: {
    // 创建账户
    createAccount() {
      const user = new Bank(this.currentDate, this.user.initMoney, this.user.name, this.user.rate)
      this.accountList.push(user)
    },
    // 存
    deposit(user) {
      this.currentDate += 1
      user.deposit(this.currentDate, this.money)
    },
    // 取
    withdraw(user) {
      this.currentDate += 1
      user.withdraw(this.currentDate, this.money)
    }
  }
})
