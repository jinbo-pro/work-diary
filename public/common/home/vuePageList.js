import { guid } from '/utils/easyHash.js'

const r = '/common/vuepage/index.html'

/**vue 页面映射 - 方便主页面搜索跳转 */
export const vuePageList = [
  { fileName: '聊天室', filePath: '/common/chatRoom/index.html' },
  { fileName: 'ObjectTransform', filePath: r },
  { fileName: '加密工具', filePath: r + '#/webcrypto' },
  { fileName: '对象键排序', filePath: r + '#/objKeySort' },
  { fileName: 'decodeAndEncode', filePath: r + '#/decodeAndEncode' },
  { fileName: 'UnicodeToText', filePath: r + '#/UnicodeToText' },
  { fileName: 'HumpAndLine', filePath: r + '#/HumpAndLine' },
  { fileName: '虚拟列表渲染', filePath: r + '#/VirtualListRender' }
].map((e) => {
  return {
    ...e,
    id: guid(),
    pid: guid(),
    isFile: 1,
    isVuePage: 1
  }
})
