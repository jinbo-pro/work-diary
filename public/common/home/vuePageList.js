import { routes } from '/common/vuepage/router/routes.js'

/**获取 vuepage 的路由 */
function getVuePageRoute() {
  const routeList = []
  let stark = []
  stark = stark.concat(routes)
  while (stark.length) {
    let temp = stark.shift()
    if (temp.children) {
      stark = stark.concat(temp.children)
    } else if (temp.meta) {
      routeList.push({
        fileName: temp.meta.title,
        filePath: `/common/vuepage/index.html#${temp.path}`
      })
    }
  }
  return routeList
}

const getId = () => 'id-' + Math.random()
/**common 页面映射 - 方便主页面搜索跳转 */
export const vuePageList = [
  { fileName: '聊天室', filePath: '/common/chatRoom/index.html' },
  { fileName: 'vue3-element-plus', filePath: '/common/vuepage-v3/index.html' },
  ...getVuePageRoute()
].map((e) => {
  return {
    ...e,
    id: getId(),
    pid: getId(),
    isFile: 1,
    isVuePage: 1
  }
})
