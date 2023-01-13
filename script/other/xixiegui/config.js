const path = require('path')

/** 安装目录*/
const gameRootDir = 'G:/SteamLibrary/steamapps/common/Vampire Survivors/resources/app/.webpack/renderer'
/** 原始文件路径*/
const srcFilePath = path.join(gameRootDir, './main.bundle.js')
/** 修改的文件路径*/
const diyFilePath = path.join(gameRootDir, './main.bundle-diy.js')
/** 名字翻译文件路径*/
const characterLangPath = path.join(gameRootDir, './assets/lang/characterLang.json')

module.exports = {
  gameRootDir,
  srcFilePath,
  diyFilePath,
  characterLangPath
}
