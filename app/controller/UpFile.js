const fs = require('fs')
const { BaseController } = require('../Base')
class UpFile extends BaseController {
  constructor() {
    super()
    this.rootPath = this.getSrcPath('public/upload/')
  }
  /**
   * 工具函数
   */
  // 检测上传文件路径是否可用
  checkUploadPath() {
    return this.tools.file.checkDir(this.rootPath)
  }
  // 创建文件写入名
  createFileWriteName(fileName) {
    let hashStr = this.tools.crypto.createMd5(Date.now() + 'world!').substr(0, 16)
    let filePath = `${this.rootPath}/${hashStr}_${fileName}`
    let publicFilePath = `${this.serverPath}/upload/${hashStr}_${fileName}`
    return { filePath, publicFilePath }
  }
  // 文件流写入操作
  fileWriteStream(file, dist) {
    return new Promise((resolve, reject) => {
      let readStream = fs.createReadStream(file.path),
        writeStream = fs.createWriteStream(dist)
      readStream.pipe(writeStream)
      readStream.on('end', () => {
        fs.unlinkSync(file.path)
        resolve(file)
      })
      readStream.on('error', (err) => {
        reject(err)
      })
    })
  }
  // 检验切片文件是否存在
  valiChunkPath(src) {
    return new Promise((resolve, reject) => {
      fs.access(src, (err) => {
        if (!err) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }
  /**
   * 业务逻辑
   */
  // 文件上传
  async index(ctx) {
    const file = ctx.request.files.file
    if (!file) {
      return (ctx.body = this.resError('请上传文件 上传字段为 file'))
    }
    const { filePath, publicFilePath } = this.createFileWriteName(file.name)
    await this.checkUploadPath()
    await this.fileWriteStream(file, filePath)
    ctx.body = this.resSuccess(publicFilePath)
  }
  // 批量文件上传
  async batchUpload(ctx) {
    let result = []
    let writeFile = []
    let files = ctx.request.files
    await this.checkUploadPath()
    for (let key in files) {
      const { filePath, publicFilePath } = this.createFileWriteName(files[key].name)
      writeFile.push(this.fileWriteStream(files[key], filePath))
      result.push(publicFilePath)
    }
    await Promise.all(writeFile)
    ctx.body = this.resSuccess(result)
  }
  // 获取已上传的切片列表
  async getChunkList(ctx) {
    const hash = ctx.request.body.hash
    if (!hash) {
      return (ctx.body = this.resError('请上传要查询的切片 hash'))
    }
    const tempDir = `${this.rootPath}/${hash}` // 切片临时文件夹
    try {
      await this.tools.file.checkDir(tempDir, false)
      let chunkList = fs.readdirSync(tempDir)
      ctx.body = this.resSuccess(chunkList)
    } catch (error) {
      ctx.body = this.resSuccess([])
    }
  }
  // 切片上传
  async single(ctx) {
    await this.checkUploadPath()
    const chunk = ctx.request.files.chunk
    const hash = ctx.request.body.hash
    const filename = ctx.request.body.filename
    const tempDir = `${this.rootPath}/${hash}` // 切片临时文件夹
    const chunkPath = `${tempDir}/${filename}` // 切片文件地址
    await this.tools.file.checkDir(tempDir)
    try {
      await this.valiChunkPath(chunkPath)
      // 存在切片不进行处理
      ctx.body = this.resSuccess({ type: 1, filename })
    } catch (error) {
      // 不存在的则创建切片
      await this.fileWriteStream(chunk, chunkPath)
      await this.tools.sleep(300) // 测试上传网络延迟
      ctx.body = this.resSuccess({ type: 2, filename })
    }
  }
  // 合并切片的文件 - *下面方法应该全部使用异步 否则容易出现异常
  async merge(ctx) {
    const hash = ctx.request.body.hash
    let path = `${this.rootPath}/${hash}`
    try {
      await this.valiChunkPath(path)
    } catch (error) {
      ctx.body = this.resError('目录不存在文件切片，请先上传文件切片')
      return
    }
    let fileList = fs.readdirSync(path)
    let suffix
    fileList
      .sort((a, b) => {
        let reg = /_(\d+)/
        return reg.exec(a)[1] - reg.exec(b)[1]
      })
      .forEach((item) => {
        !suffix ? (suffix = /\.([\w]+)$/.exec(item)[1]) : null
        // 合并文件
        fs.appendFileSync(`${this.rootPath}/${hash}.${suffix}`, fs.readFileSync(`${path}/${item}`))
        fs.unlinkSync(`${path}/${item}`) // 清除切片文件
      })
    fs.rmdirSync(path) // 清除切片临时文件夹
    ctx.body = this.resSuccess(`${this.serverPath}/upload/${hash}.${suffix}`)
  }
}

module.exports = new UpFile()
