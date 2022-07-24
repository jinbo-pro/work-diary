function uniform2NormalDistribution() {
  var sum = 0.0
  for (var i = 0; i < 12; i++) {
    sum = sum + Math.random()
  }
  return sum - 6.0
}
/**
 * 生成正态分布数据
 * @param {number} mean 标准值
 * @param {number} std_dev 标准差
 * @returns
 */
function getNumberInNormalDistribution(mean, std_dev) {
  return mean + uniform2NormalDistribution() * std_dev
}

let data = {}
for (let i = 0; i < 1e5; i++) {
  /**
   * 获得均值为180，要68.26%左右的学生身高都在[170,190]之内，即1个标准差范围内，因此标准差为10
   * 可以通过 getNumberInNormalDistribution(180,10) 调用
   */
  let key = ~~getNumberInNormalDistribution(180, 10)
  if (data[key]) {
    data[key]++
  } else {
    data[key] = 1
  }
}
// echarts 绘制正态分布数据
var myChart = echarts.init(document.getElementById('main'))
var option = {
  title: {
    text: '学生身高'
  },
  xAxis: {
    data: Object.keys(data)
  },
  yAxis: {},
  series: [
    {
      name: '身高',
      type: 'bar',
      data: Object.values(data)
    }
  ]
}
myChart.setOption(option)
