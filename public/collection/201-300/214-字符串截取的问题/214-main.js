const str = '文字😊和👍截取' // 要求截取： 😊和👍

/**
 * 默认的字符串截取 取的是码元的位置
 * 而表情符号和一些生僻字占用了两个码元所以不能正常截取
 */
const b = str.slice(2, 5) // '😊和'

// 1. 使用 lodash 的 toArray 方法可以很好的处理
var strList = _.toArray(str)
var result = strList.slice(2, 5)
console.log(result.join(''), '-->>> result')

// 2. 其他的奇怪字符使用 grapheme-splitter https://www.npmjs.com/package/grapheme-splitter
var splitter = new GraphemeSplitter()
let graphemeResult = [
  splitter.splitGraphemes('abcd'), // returns ["a", "b", "c", "d"]
  splitter.splitGraphemes('🌷🎁💩😜👍🏳️‍🌈'), // returns ["🌷","🎁","💩","😜","👍","🏳️‍🌈"]
  splitter.splitGraphemes('अनुच्छेद'), // returns ["अ","नु","च्","छे","द"]
  splitter.splitGraphemes('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞') // returns ["Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍","A̴̵̜̰͔ͫ͗͢","L̠ͨͧͩ͘","G̴̻͈͍͔̹̑͗̎̅͛́","Ǫ̵̹̻̝̳͂̌̌͘","!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞"]
]

console.log(graphemeResult, '-->>> graphemeResult')
