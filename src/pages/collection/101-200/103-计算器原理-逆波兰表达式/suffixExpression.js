/**
 * 中缀表达式转换成后缀表达式
 * @param {string} str
 */
function suffixExpression(str) {
  const symbol = {
    '(': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
    ')': 4
  }
  function operaSymbol(char, sym, res) {
    let lastChar = sym[sym.length - 1]
    if (!lastChar) {
      sym.push(char)
    }
    if (char === '(') {
      sym.push(char)
    } else if (char === ')') {
      let currChar = sym.pop()
      while (sym && currChar !== '(') {
        res.push(currChar)
        currChar = sym.pop()
      }
    } else if (symbol[char] > symbol[lastChar]) {
      sym.push(char)
    } else if (symbol[char] <= symbol[lastChar]) {
      while (lastChar && symbol[char] <= symbol[lastChar]) {
        let currChar = sym.pop()
        res.push(currChar)
        lastChar = sym[sym.length - 1]
      }
      sym.push(char)
    }
  }
  let res = []
  let sym = []
  let substr = '' //数字>=10时遍历会记为两个数字
  str = str.replace(/\s/g, '') // 去除空格
  for (let i = 0; i < str.length; i++) {
    let item = str[i]
    if (item in symbol) {
      if (substr) {
        res.push(substr)
      }
      substr = ''
      operaSymbol(item, sym, res)
    } else {
      substr += item
    }
  }
  if (substr) {
    res.push(substr)
  }
  sym = sym.filter((e) => e !== '(')
  while (sym.length > 0) {
    let currChar = sym.pop()
    res.push(currChar)
  }
  return res
}

// module.exports = suffixExpression
