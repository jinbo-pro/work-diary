// 使用 Haversine 公式来计算两个经纬度之间的距离
function getDistanceHaversine(lat1, lon1, lat2, lon2) {
  const deg2rad = (deg) => deg * (Math.PI / 180)
  var R = 6371 // 地球半径，单位为千米
  var dLat = deg2rad(lat2 - lat1)
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var distance = R * c
  return distance
}
// 使用 Vincenty 公式来计算两个经纬度之间的距离
function getDistanceVincenty(lat1, lon1, lat2, lon2) {
  const deg2rad = (deg) => deg * (Math.PI / 180)
  var a = 6378137 // 赤道半径，单位为米
  var b = 6356752.314245 // 极半径，单位为米
  var f = 1 / 298.257223563 // 扁率
  var L = deg2rad(lon2 - lon1)
  var U1 = Math.atan((1 - f) * Math.tan(deg2rad(lat1)))
  var U2 = Math.atan((1 - f) * Math.tan(deg2rad(lat2)))
  var sinU1 = Math.sin(U1)
  var cosU1 = Math.cos(U1)
  var sinU2 = Math.sin(U2)
  var cosU2 = Math.cos(U2)
  var lambda = L
  var lambdaP = 2 * Math.PI
  var iterLimit = 20
  while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0) {
    var sinLambda = Math.sin(lambda)
    var cosLambda = Math.cos(lambda)
    var sinSigma = Math.sqrt(
      cosU2 * sinLambda * (cosU2 * sinLambda) +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
    )
    if (sinSigma == 0) {
      return 0 // 两点重合
    }
    var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda
    var sigma = Math.atan2(sinSigma, cosSigma)
    var sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma
    var cosSqAlpha = 1 - sinAlpha * sinAlpha
    var cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha
    if (isNaN(cos2SigmaM)) {
      cos2SigmaM = 0 // 两点重合
    }
    var C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha))
    lambdaP = lambda
    lambda =
      L +
      (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)))
  }
  if (iterLimit == 0) {
    return NaN // 计算失败
  }
  var uSq = (cosSqAlpha * (a * a - b * b)) / (b * b)
  var A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)))
  var B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)))
  var deltaSigma =
    B *
    sinSigma *
    (cos2SigmaM +
      (B / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
          (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)))
  var distance = b * A * (sigma - deltaSigma)
  return distance / 1000 // 转换为千米
}

new Vue({
  el: '#app',
  data() {
    return {
      a: '104.072527,30.675418',
      b: '116.40,39.92',
      resultHaversine: '',
      resultVincenty: ''
    }
  },
  created() {},
  methods: {
    handle() {
      if (!this.a || !this.b) return this.$message.error('请输入经纬度')
      const [lonA, latA] = this.a.split(',')
      const [lonB, latB] = this.b.split(',')
      const params = [latA, lonA, latB, lonB].map((x) => Number(x))
      this.resultHaversine = getDistanceHaversine(...params)
      this.resultVincenty = getDistanceVincenty(...params)
    }
  }
})
