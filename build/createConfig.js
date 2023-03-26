const { resolve } = require('./utils')
const parseCdn = require('./vitePluginParseCdn/parse')
const { createVuePlugin } = require('vite-plugin-vue2')
const getFileFlatList = require('../app/utils/getFileFlatList')

const list = getFileFlatList(resolve('/src/pages'), true)
let input = {
  index: resolve('/src/index.html')
}

for (let item of list) {
  if (!item.isFile) continue
  if (item.fileName.endsWith('.html')) {
    let prefix = ''
    // 其他 index.html 的添加前缀名
    if (item.fileName == 'index.html') {
      const parentDir = list.find((e) => e.id == item.pid)
      prefix = parentDir ? parentDir.fileName : ''
    }
    input[prefix + item.fileName] = item.filePath
  }
}

/**创建打包配置 */
function createConfig(mode) {
  return {
    root: resolve('/src'),
    build: {
      outDir: resolve('/dist/public'),
      assetsDir: 'static',
      emptyOutDir: true,
      rollupOptions: {
        input,
        output: {
          entryFileNames: 'static/js/[name]-[hash:8].js',
          chunkFileNames: 'static/common/[name]-[hash:8].js',
          assetFileNames: 'static/css/[name]-[hash:8].[ext]',
          compact: true
        }
      }
    },
    base: './',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      createVuePlugin({
        vueTemplateOptions: {}
      }),
      parseCdn()
    ]
  }
}

module.exports = createConfig
