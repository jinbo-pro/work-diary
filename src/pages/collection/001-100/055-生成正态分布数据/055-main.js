/**
 * 生成正态分布数据
 * @param {number} mean 随机数的中心点
 * @param {number} stdDev 正态分布的标准差
 * @returns
 */
function generateNormalRandomNumbers(mean = 0, stdDev = 1) {
  let u = Math.random()
  let v = Math.random()
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  return mean + stdDev * z
}

let data = {}
for (let i = 0; i < 10000; i++) {
  /**
   * 获得均值为180，要68.26%左右的学生身高都在[170,190]之内，即10个标准差范围内
   * 这个算法使用了 Box-Muller 转换来生成正态分布数据
   */
  let key = ~~generateNormalRandomNumbers(180, 10)
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    data: Object.keys(data)
  },
  yAxis: {},
  series: [
    {
      name: '人数',
      type: 'bar',
      data: Object.values(data)
    }
  ]
}
myChart.setOption(option)
