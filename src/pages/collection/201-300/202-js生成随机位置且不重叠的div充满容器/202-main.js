/**生成随机数 */
function ra(max) {
  return max * Math.random()
}
/**
 * 生成重叠的点
 * @param {number} w 容器最大宽度
 * @param {number} h 容器最大高度
 * @param {number} count 生成数量
 * @param {number} domW dom 大小
 */
function createPoint(w, h, count, domW) {
  // 已存在的点
  const pointList = []
  // 最大填充数量
  const maxCount = ~~((w / domW) * (h / domW) * 0.6)
  if (count > maxCount) {
    count = maxCount
    console.log(`为防止堆栈溢出建议最大数量：${maxCount}`)
  }
  // 检测点是否与其他点发生重叠
  const checkPointOverlap = (x, y) => {
    for (let item of pointList) {
      const p2 = (x - item.x) ** 2 + (y - item.y) ** 2
      const L = Math.sqrt(p2, 2)
      if (L <= domW) return true
    }
    return false
  }
  while (pointList.length < count) {
    const x = ra(w)
    const y = ra(h)
    // 检测点是否超出边界
    if (x + domW > w || y + domW > h) continue
    if (checkPointOverlap(x, y)) continue
    pointList.push({ x, y })
  }
  return pointList
}

new Vue({
  el: '#app',
  data() {
    return {
      count: 10,
      domSize: 80,
      list: []
    }
  },
  created() {},
  mounted() {
    this.initUserList()
  },
  methods: {
    initUserList() {
      const dom = document.getElementById('container')
      const w = dom.clientWidth
      const h = dom.clientHeight
      console.time('createTime：')
      const pointList = createPoint(w, h, this.count, this.domSize)
      console.timeEnd('createTime：')
      this.list = pointList.map((e, i) => {
        return {
          name: i + 1,
          style: {
            top: e.y + 'px',
            left: e.x + 'px',
            width: this.domSize + 'px',
            height: this.domSize + 'px'
          }
        }
      })
    }
  }
})
