const { BaseController } = require('../Base')

class FileDirectory extends BaseController {
  constructor() {
    super()
    this.dirContain = [
      // 包含的文件夹
      'loading',
      'notepad',
      'collection'
    ]
  }
  // 获取列表
  async getList(ctx) {
    const { treeList } = await this.servers.FileDirData.getFileList()
    // 筛选所需文件树
    let dirList = ctx.query.dirList
      ? ctx.query.dirList.split(',')
      : this.dirContain
    const result = treeList.filter((e) => dirList.includes(e.fileName))
    ctx.body = this.resSuccess(result)
  }
  // 根据id获取子集列表
  async getById(ctx) {
    let id = ctx.query.id
    if (!id) {
      return (ctx.body = this.resError('请传入id'))
    }
    const { flatList } = await this.servers.FileDirData.getFileList()
    let cur = flatList.find((e) => e.id == id) || null
    ctx.body = this.resSuccess(cur)
  }
}

module.exports = new FileDirectory()
