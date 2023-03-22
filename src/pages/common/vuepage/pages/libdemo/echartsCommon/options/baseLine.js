/**
 * 基础折线图
 */
 export const baseLine = {
  // 标题
  title: {
    text: '基础折线图'
  },
  // 提示框
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  // 数据值显示在图上
  label: {
    show: true,
    position: 'top'
  },
  // 图例
  legend: {
    show: true,
    right: 10,
    align: 'right',
    data: ['数据统计1', '数据统计2']
  },
  // 容器的 padding 设置
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  // x 轴数据
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月']
    }
  ],
  // y 轴单位
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: function (value) {
          return `${value} 数量`
        }
      }
    }
  ],
  // 数据值
  series: [
    {
      name: '数据统计1',
      type: 'line',
      data: [12, 29, 21]
    },
    {
      name: '数据统计2',
      type: 'line',
      data: [25, 32, 18]
    }
  ]
}
