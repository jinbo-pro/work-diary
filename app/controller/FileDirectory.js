const getFileFlatList = require('../utils/getFileFlatList')
const { BaseController } = require('../Base')

class FileDirectory extends BaseController {
  // 获取文件列表
  async getList(ctx) {
    const dir = ctx.query.dir
    if (!dir) {
      ctx.body = this.resError('请传入文件夹路径')
      return
    }
    const result = getFileFlatList(this.getSrcPath(dir))

    if (dir == 'pages/collection') {
      const metaConfig = require(this.getSrcPath('metaConfig.json'))
      for (let item of result) {
        const tag = metaConfig[item.fileName]
        if (tag) {
          item.meta = { name: item.fileName, tag }
        }
      }
    }

    ctx.body = this.resSuccess(result)
  }
}

module.exports = new FileDirectory()
