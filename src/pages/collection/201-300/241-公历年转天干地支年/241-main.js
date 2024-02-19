function getLunarYearInfo(year) {
  const gan = '甲乙丙丁戊己庚辛壬癸'
  const zhi = '子丑寅卯辰巳午未申酉戌亥'
  const startYear = 1924 // 甲子年
  const ganIndex = Math.abs(year - startYear) % 10
  const zhiIndex = Math.abs(year - startYear) % 12
  const ganStr = gan.charAt(ganIndex)
  const zhiStr = zhi.charAt(zhiIndex)
  return ganStr + zhiStr
}
function getJz(tg, dz) {
  var frist = tg[0] + dz[0]
  const result = [frist]
  var current = ''
  var index = 1
  while (frist !== current) {
    const tgIndex = index % tg.length
    const dzIndex = index % dz.length
    current = tg[tgIndex] + dz[dzIndex]
    if (frist === current) break
    result.push(current)
    index++
  }
  return result
}

new Vue({
  el: '#app',
  data() {
    return {
      tg: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
      dz: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
      result: '',
      jzList: [],
      year: new Date().getFullYear() + ''
    }
  },
  filters: {
    formatYear(v) {
      return v ? getLunarYearInfo(v) : ''
    }
  },
  created() {
    this.jzList = getJz(this.tg, this.dz)
  }
})
