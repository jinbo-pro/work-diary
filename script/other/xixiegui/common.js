const fs = require('fs')
const path = require('path')
const { characterLangPath } = require('./config')

const keyList = [
  { title: '名称', key: 'charName' },
  { title: 'HP', key: 'maxHp' },
  { title: '力量', key: 'power' },
  { title: '恢复', key: 'regen' },
  { title: '防御', key: 'armor' },
  { title: '攻击范围', key: 'area' },
  { title: '飞射速度', key: 'speed' },
  { title: '移动速度', key: 'moveSpeed' },
  { title: '冷却时间', key: 'cooldown' },
  { title: '持续时间', key: 'duration' },
  { title: '发射数量', key: 'amount' },
  { title: '念力', key: 'magnet' },
  { title: '运气', key: 'luck' },
  { title: '成长', key: 'growth' },
  { title: '贪欲', key: 'greed' },
  { title: '诅咒', key: 'curse' },
  { title: '排除', key: 'banish' }
]

/**
 * 获取配置代码
 * @param {string} text
 */
function getConfigCode(text) {
  if (!text) return []
  const checkStr = (index, str) => {
    return text.slice(index, index + str.length) === str
  }
  const getEndIndex = (startIndex) => {
    let index = startIndex
    while (true) {
      if (checkStr(index, "'showcase':")) return index
      index++
    }
  }
  const characterLang = require(characterLangPath)
  const nameLang = characterLang['zh-CN']['translations']

  let len = text.length
  let list = []
  for (let i = 0; i < len; i++) {
    if (checkStr(i, "'charName':")) {
      const endIndex = getEndIndex(i)
      const code = text.slice(i, endIndex)
      const strList = code.split(',')
      const content = keyList.map((e) => {
        const cur = strList.find((x) => x.includes(`'${e.key}':`))
        if (!cur) return null
        const [k, v] = cur.split(':')
        return {
          ...e,
          value: e.key == 'charName' ? v.replace(/'/g, '') : Number(v)
        }
      })
      const nameEn = content[0].value
      const d = nameLang[nameEn.toLocaleUpperCase()]
      const name = d ? d.charName : nameEn
      list.push({ startIndex: i, endIndex, name, content: content.slice(1).filter((x) => x) })
    }
  }
  return list
}
/**
 * 解析字符串
 * @param {string} str
 */
function parseStrToJson(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.log(error, 'json 解析失败')
    return null
  }
}
/**
 * 返回
 * @param {http.ServerResponse<http.IncomingMessage>} res
 * @param {string} type
 * @param {any} content
 */
function response(res, type, content) {
  if (typeof content == 'object') {
    content = JSON.stringify(content)
  }
  res.setHeader('Content-Type', type)
  res.write(content)
  res.end()
}
/**
 * 解析post body
 * @param {http.IncomingMessage} req
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let postdata = ''
    req.on('data', function (chunk) {
      postdata += chunk
    })
    req.on('end', function () {
      resolve(postdata)
    })
    req.on('error', reject)
  })
}
/**
 * 读取文件
 * @param {string} filePath
 * @param {boolean} isBinary
 * @returns
 */
function readFile(filePath, isBinary) {
  const url = path.resolve(__dirname, `./view/${filePath}`)
  return isBinary ? fs.readFileSync(url, 'binary') : fs.readFileSync(url).toString()
}
/**
 * 检查文件可访问性
 * @param {string} dst
 * @returns
 */
function checkDir(dst) {
  return new Promise((resolve, reject) => {
    fs.access(dst, (err) => (err ? resolve(false) : resolve(true)))
  })
}

module.exports = {
  keyList,

  getConfigCode,
  parseStrToJson,

  response,
  parseBody,
  readFile,
  checkDir
}
