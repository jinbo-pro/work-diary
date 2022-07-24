const fs = require('fs')
const path = require('path')
const parse = require('reverse-sourcemap')

// 需要解析的文件夹
const parsePath = path.resolve(__dirname, './js')
// 输出文件夹
const outPath = path.resolve(__dirname, './src')

function parseFile(filePath, fileName) {
  const fileStr = fs.readFileSync(filePath).toString()
  parse(fileStr, {}).then((res) => {
    console.log(`解析 ${fileName} 成功`)
    for (let key in res) {
      const code = res[key]
      const name = key.replace(/\\/g, '_')
      // 跳过 node_modules 依赖
      if (/node_modules/.test(name)) {
        continue
      }
      fs.writeFileSync(path.join(outPath, name), code)
    }
  })
}

function createOutDir() {
  try {
    fs.mkdirSync(outPath)
  } catch (error) {
    console.log('文件夹已创建开始解析 map')
  }
}

function main() {
  createOutDir()
  let fileList = fs.readdirSync(parsePath)
  for (let fileName of fileList) {
    if (fileName.endsWith('.map')) {
      let filePath = path.join(parsePath, fileName)
      parseFile(filePath, fileName)
    }
  }
}

main()
