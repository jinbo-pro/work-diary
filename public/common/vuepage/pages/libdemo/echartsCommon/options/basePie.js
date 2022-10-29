/**
 * 基础饼图
 */
export const basePie = {
  // 标题
  title: {
    text: '基础饼图',
    x: 'center'
  },
  // 提示框
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  // 图例
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  // 容器的 padding 设置
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  // 数据值
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
