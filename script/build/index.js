/**
 * 打包整理文件
 */
const fs = require('fs')
const path = require('path')
const tools = require('../../app/utils/tools')
const fileDirectory = require('../../app/controller/fileDirectory')

/**
 * 整理文件
 */
async function formatFile() {
  // 首页模拟数据
  let ctx = { query: {}, body: {} }
  await fileDirectory.getList(ctx)
  let result = tools.resSuccess(ctx.body.data)
  fs.writeFileSync(path.resolve(__dirname, '../../public/mockData/home_fileList.json'), JSON.stringify(result))
  console.log('\x1B[33m%s\x1b[0m:', '-->>> [ 首页数据获取完成 ]')
}

formatFile()
