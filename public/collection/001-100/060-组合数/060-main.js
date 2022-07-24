console.log('060-组合数')

function computed(n, m) {
  var a = 1
  for (var i = n; i > n - m; i--) {
    a *= i
  }
  var b = 1
  for (var i = 1; i <= m; i++) {
    b *= i
  }
  return a / b
}

$('#handel').on('click', function () {
  var n = parseInt($('#n').val())
  var m = parseInt($('#m').val())
  var c = computed(n, m)
  $('#result').text(c)
})
