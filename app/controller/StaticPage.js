const { BaseController } = require('../Base')
/**
 * 静态页面管理
 */
class StaticPage extends BaseController {
  // 页面
  async page(ctx) {
    let id = ctx.params.id
    if (!id) {
      return (ctx.body = '参数错误')
    }
    id = id.split('-')[0]
    const { flatList } = await this.servers.FileDirData.getFileList()
    let curPage = flatList.find((e) => e.id == id)
    if (!curPage) {
      return (ctx.body = '404 页面不存在')
    }
    ctx.redirect(curPage.filePath)
  }
}

module.exports = new StaticPage()
