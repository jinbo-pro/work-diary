const result = document.getElementById('result')
const passwordDom = document.getElementById('password')

const m = function (match, length) {
  return { match: match, length: length }
}
const HSIMPmatches = {
  'ASCII Lowercase': m(/[a-z]/, 26),
  'ASCII Uppercase': m(/[A-Z]/, 26),
  'ASCII Numbers': m(/\d/, 10),
  'ASCII Top Row Symbols': m(/[!@£#\$%\^&\*\(\)\-_=\+]/, 15),
  'ASCII Other Symbols': m(/[\?\/\.>\,<`~\\|"';:\]\}\[\{\s]/, 19),
  'Unicode Latin 1 Supplement': m(/[\u00A1-\u00FF]/, 94),
  'Unicode Latin Extended A': m(/[\u0100-\u017F]/, 128),
  'Unicode Latin Extended B': m(/[\u0180-\u024F]/, 208),
  'Unicode Latin Extended C': m(/[\u2C60-\u2C7F]/, 32),
  'Unicode Latin Extended D': m(/[\uA720-\uA7FF]/, 29),
  'Unicode Cyrillic Uppercase': m(/[\u0410-\u042F]/, 32),
  'Unicode Cyrillic Lowercase': m(/[\u0430-\u044F]/, 32)
}

function timeFormat(t) {
  if (t > 31556926) return ~~(t / 31556926) + '年'
  if (t > 86400) return ~~(t / 86400) + '天'
  if (t > 3600) return ~~(t / 3600) + '小时'
  if (t > 60) return ~~(t / 60) + '分钟'
  return t + '秒'
}

passwordDom.oninput = function () {
  var password = this.value
  if (!password) {
    result.value = ''
    return
  }
  const length = password.length
  let sum = 0
  for (let i in HSIMPmatches) {
    if (password.match(HSIMPmatches[i].match)) {
      sum += HSIMPmatches[i].length
    }
  }
  const time = Math.pow(sum, length) / 2.5e8
  result.value = '一台普通PC破解你的密码需要约 ' + timeFormat(time)
}
