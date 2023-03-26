const cdnConfig = require('./cdnConfig')

/**
 * 解析 html 里面的 cdn
 */
function parseCdn() {
  return {
    // 插件名字
    name: 'vite-plugin-parseCdn',
    enforce: 'pre',
    transformIndexHtml(html) {
      const reg = RegExp('<meta name="cdnload" content="([\\w|,]+)" />', 'g')
      return html.replace(reg, (all, cdnName) => {
        if (!cdnName) return ''
        const list = cdnName.split(',')
        return list.reduce((p, c) => {
          let tag = ''
          const url = cdnConfig[c]
          if (!url) {
            console.log(`未配置 ${c} 的 cdn 映射`)
          } else if (url.endsWith('.js')) {
            tag = `<script type="text/javascript" src="${url}"></script>`
          } else if (url.endsWith('.css')) {
            tag = `<link rel="stylesheet" href="${url}" />`
          }
          p += tag
          return p
        }, '')
      })
    }
  }
}

module.exports = parseCdn
