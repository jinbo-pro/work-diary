const { BaseServer } = require('../Base')

// 文件数据
class FileDirData extends BaseServer {
  constructor() {
    super()
    this.coverList = []
    this.flatList = [] // 扁平的文件列表，方便高效查找
    this.treeList = [] // 树状文件列表
  }
  // 获取元信息
  getMetaInfo(e) {
    if (e.isFile == 1) return null
    try {
      let meta = require(this.path.join(e.filePath, 'm.json'))
      return meta
    } catch (error) {
      return null
    }
  }
  // 加载文件夹
  loadDir() {
    const dirPath = this.getSrcPath('./public/')
    var result = this.tools.file.getFileFlatList(dirPath)
    return result.map((e) => {
      const meta = this.getMetaInfo(e)
      let item = {
        ...e,
        filePath: e.filePath.replace(this.tools.file.pathSlash(dirPath), '')
      }
      if (meta) {
        item.meta = meta
      }
      return item
    })
  }
  // 获取文件
  async getFileList() {
    if (!this.flatList.length || !this.treeList.length) {
      this.flatList = this.loadDir()
      this.treeList = this.tools.jcore.tree.toTree(this.flatList)
    }
    return { flatList: this.flatList, treeList: this.treeList }
  }
}

module.exports = new FileDirData()
