import { join } from './pathJoin.js'
/**less cdn */
const lessCDN = 'https://lib.baomitu.com/less.js/4.1.2/less.min.js'

/**获取匹配的代码块 */
function getStrMatch(str, block) {
  const reg = RegExp(`<${block}([\\s\\S]*?)>([\\s\\S\n]+?)</${block}>`)
  let s = str.match(reg)
  return s ? s : []
}
/**字符串 hash */
function textHax(str) {
  for (var i = 0, num = 0, len = str.length; i < len; i++) {
    num += str.charCodeAt(i) / (i + 1.3)
  }
  return (String(num).replace('.', '') - 0).toString(36)
}
/**解析子模块相对路径为根路径 */
function resolvePath(filePath, path) {
  if (/\.\//.test(path)) {
    return join(filePath.replace(/[\w]+?\.vue/, ''), path)
  } else {
    return path
  }
}

export class LoadVue {
  /**
   * vue 加载器
   * @param {string} rootDir 实例文件根路径类似 nodejs 的 __dirname
   * @param {boolean} isV3 是否是 vue3 模式
   */
  constructor(rootDir, isV3) {
    this.rootDir = rootDir
    this.isV3 = isV3
    /**样式 dom 容器 */
    this.stylesMap = new Map()
  }
  /**
   * 解析 template
   * @param {string} vueStr
   */
  parseTemplate(vueStr) {
    let [, , template] = getStrMatch(vueStr, 'template')
    return template || ''
  }
  /**解析子引用 */
  parseImport(filePath, mode, path) {
    // vue 文件
    if (path.endsWith('.vue')) {
      const asyncVue = `() => loadVue('${resolvePath(filePath, path)}')`
      const v3AsyncVue = `Vue.defineAsyncComponent(${asyncVue})`
      return `const ${mode} = ${this.isV3 ? v3AsyncVue : asyncVue}`
      // js 文件
    } else if (path.endsWith('.js')) {
      return `const ${mode} = await import('${resolvePath(filePath, path)}');`
      // 裸模块
    } else if (!/\.|\//.test(path)) {
      if (!Reflect.has(window, 'package')) {
        console.error('[loadVue] 未初始化 window.package 无法解析裸模块')
        return ''
      } else {
        return `const ${mode} = package['${path}']`
      }
      // 未知文件
    } else {
      console.warn(`[loadVue] 未添加路径后缀名无法解析文件请添加 .js .vue`)
      return ''
    }
  }
  /**
   * 解析 JavaScript
   * @param {string} vueStr
   * @param {string} filePath
   */
  async parseJavaScript(vueStr, filePath) {
    let [, jsAttr, jsStr] = getStrMatch(vueStr, 'script')
    if (!jsStr) return ''
    let code = jsStr
      .replace(/import\s([\s\S]+?)\sfrom\s'([\s\S]+?)'/g, (a, mode, path) => {
        return this.parseImport(filePath, mode, path)
      })
      .replace('export default', 'return')
    if (/import/.test(jsStr)) {
      // 注入子模块加载函数
      code = `
      const { createLoadVue } = await import('/utils/module/loadVue.js');
      const loadVue = createLoadVue('', ${this.isV3})
      ${code}`
    }
    // 包装函数为 async 使其支持组件内部使用顶层 await
    try {
      let jsFn = new Function(`return (async function(){ ${code} })`)()
      return await jsFn()
    } catch (error) {
      console.error(error)
      console.info(code)
      return ''
    }
  }
  /**加载 less.js */
  async loadLessJs() {
    if (window.less) return window.less
    await import(lessCDN)
    return window.less
  }
  /**
   * 解析 style
   * @param {string} vueStr
   * @param {string} filePath
   * @param {string} template
   * @returns
   */
  async parseStyle(vueStr, filePath, template) {
    const p = async () => {
      const styleId = `s_${filePath}`
      let [, cssAttr, style] = getStrMatch(vueStr, 'style')
      let css = style
      if (!css) return
      const csswarp = 'c' + textHax(filePath)
      if (cssAttr.includes('scoped')) {
        template = `<div class="${csswarp}" data-r="csswarp">${template}</div>`
      }
      if (this.stylesMap.has(styleId)) return
      // less scoped 功能依赖于 less.js
      if (cssAttr.includes('scoped')) {
        const less = await this.loadLessJs()
        const parseLess = await less.render(`.${csswarp} { ${style} }`)
        css = parseLess.css
      } else if (cssAttr.includes('less')) {
        const less = await this.loadLessJs()
        const parseLess = await less.render(style)
        css = parseLess.css
      }
      const styleDom = document.createElement('style')
      styleDom.id = styleId
      styleDom.innerHTML = css
      styleDom.setAttribute('type', 'text/css')
      this.stylesMap.set(styleId, styleDom)
      document.body.append(styleDom)
      return css
    }
    const css = await p()
    return { css, template }
  }
  /**
   * 解析 vue 文件
   * @param {string} vueStr
   * @param {string} filePath
   */
  async parseVue(vueStr, filePath) {
    const html = this.parseTemplate(vueStr)
    const js = await this.parseJavaScript(vueStr, filePath)
    const { template } = await this.parseStyle(vueStr, filePath, html)
    return { template, ...js }
  }
  /**
   * 获取文件内容
   * @param {string} filePath 文件路径
   * @returns
   */
  async getVueFile(filePath) {
    // 相对路径合并
    if (this.rootDir) {
      filePath = join(this.rootDir, filePath)
    }
    const url = filePath.endsWith('.vue') ? filePath : filePath + '.vue'
    try {
      const response = await fetch(url)
      if (!response.ok) return null
      const res = await response.text()
      if (!res) return null
      return await this.parseVue(res, filePath)
    } catch (error) {
      console.error(error)
      console.info(`${filePath} 获取失败`)
      return null
    }
  }
  /**
   * 加载 vue 文件
   * @param {string|string[]} filePath 文件路径
   */
  async load(filePath) {
    if (Array.isArray(filePath)) {
      const loadList = filePath.map((src) => this.getVueFile(src))
      return await Promise.all(loadList)
    } else {
      return await this.getVueFile(filePath)
    }
  }
}

/**
 * 创建 vue 加载器
 * @param {string} rootDir
 * @param {boolean} isV3
 * @returns
 */
export function createLoadVue(rootDir, isV3 = false) {
  const v = new LoadVue(rootDir, isV3)
  return function (filePath) {
    return v.load(filePath)
  }
}
