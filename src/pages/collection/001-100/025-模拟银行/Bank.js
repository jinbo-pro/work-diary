class Bank {
  constructor(date, balance, userName, rate) {
    // 开户时间
    this.date = date
    // 账号名
    this.userName = userName
    // 利率
    this.rate = Number(rate)
    // 余额
    this.balance = Number(balance)
    // 利息累计
    this.interestSum = 0
    // 存储上次余额变动日期
    this.lastDate = 1
    // 账单列表
    this.orderList = []
  }
  // 显示账户信息
  showUserInfo() {
    console.log({
      date: this.date,
      userName: this.userName,
      rate: this.rate
    })
  }
  // 存款
  deposit(date, amount) {
    this.accumulate(date, amount)
  }
  // 取款
  withdraw(date, amount) {
    this.accumulate(date, -amount)
  }
  // 计算截至指定日期的账户余额按日累积值
  accumulate(date, amount) {
    for (let i = 1; i <= date - this.lastDate; i++) {
      this.settle(i)
    }
    this.balance += Number(amount)
    this.record(date, amount)
  }
  // 计算利息 活期利息 = 存款余额 * (活期利率 / 360) * 存款天数
  settle(date) {
    var itemInter = this.balance * (this.rate / 360) * date
    this.interestSum = parseFloat((this.interestSum + itemInter).toFixed(4))
  }
  // 流水记录
  record(date, amount) {
    this.lastDate = date
    this.orderList.push({
      date,
      amount,
      interestSum: this.interestSum,
      sumBalanceInter: this.balance + this.interestSum
    })
  }
}
