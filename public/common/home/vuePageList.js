import { guid } from '/utils/easyHash.js'

/**vue 页面映射 - 方便主页面搜索跳转 */
export const vuePageList = [
  { fileName: '聊天室', filePath: '/common/chatRoom/index.html' },
  { fileName: 'ObjectTransform', filePath: '/common/vuepage/index.html' },
  { fileName: '加密工具', filePath: '/common/vuepage/index.html#/webcrypto' },
  { fileName: 'decodeAndEncode', filePath: '/common/vuepage/index.html#/decodeAndEncode' },
  { fileName: 'UnicodeToText', filePath: '/common/vuepage/index.html#/UnicodeToText' },
  { fileName: 'HumpAndLine', filePath: '/common/vuepage/index.html#/HumpAndLine' }
].map((e) => {
  return {
    ...e,
    id: guid(),
    pid: guid(),
    isFile: 1,
    isVuePage: 1
  }
})
