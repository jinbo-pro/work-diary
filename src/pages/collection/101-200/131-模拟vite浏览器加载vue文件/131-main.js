console.log('131-模拟vite浏览器加载vue文件')

/**样式 dom 容器 */
const stylesMap = new Map()

/**
 * 加载 vue 文件
 * @param {string} filePath 文件路径
 */
async function loadVue(filePath) {
  const response = await fetch(filePath, { method: 'get' })
  const res = await response.text()
  // 解析 template
  let template = ''
  res.replace(/<template>([\s\S\n]+)<\/template>/, (a, html) => {
    template = html
  })
  // 解析 js
  let js = ''
  res.replace(/<script[\s\S]*?>([\s\S\n]+)<\/script>/, (a, str) => {
    const code = str.replace('export default', 'return')
    js = new Function(code)()
  })
  // 解析 style
  const styleId = `cssid_${filePath}`
  if (!stylesMap.has(styleId)) {
    res.replace(/<style[\s\S]*?>([\s\S\n]+)<\/style>/, (a, css) => {
      const styleDom = document.createElement('style')
      styleDom.id = styleId
      styleDom.innerHTML = css
      stylesMap.set(styleId, styleDom)
      document.body.append(styleDom)
    })
  }
  return { template, ...js }
}

async function main() {
  const App = await loadVue('./App.vue')
  // 更加完善的 loadVue 参见 /utils/module/loadVue.js
  const AboutBtn = await loadVue('./AboutBtn.vue')
  new Vue({
    el: '#app',
    components: {
      AboutBtn
    },
    ...App
  })
}
main()
