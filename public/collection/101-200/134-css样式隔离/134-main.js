console.log('134-css样式隔离')

/**创建沙箱dom */
function openShadow(domNode) {
  var shadow = domNode.attachShadow({ mode: 'open' })
  shadow.innerHTML = domNode.innerHTML
  domNode.innerHTML = ''
}
var bodyNode = document.getElementById('app1')
openShadow(bodyNode)

/**
 * 添加样式前缀
 */

function scopeCss(styleNode, prefix) {
  const css = ruleStyle(styleNode.sheet.cssRules[0], prefix)
  styleNode.textContent = css
}

function ruleStyle(rule, prefix) {
  const rootSelectorRE = /((?:[^\w\-.#]|^)(body|html|:root))/gm
  let { cssText } = rule
  // 绑定选择器, a,span,p,div { ... }
  cssText = cssText.replace(/^[\s\S]+{/, (selectors) => {
    return selectors.replace(/(^|,\n?)([^,]+)/g, (item, p, s) => {
      // 绑定 div,body,span { ... }
      if (rootSelectorRE.test(item)) {
        return item.replace(rootSelectorRE, (m) => {
          // 不要丢失有效字符 如 body,html or *:not(:root)
          const whitePrevChars = [',', '(']
          if (whitePrevChars.includes(m[0])) {
            return `${m[0]}${prefix}`
          }
          // 用前缀替换根选择器
          return prefix
        })
      }
      return `${p}${prefix} ${s.replace(/^ */, '')}`
    })
  })
  return cssText
}
var container = document.getElementById('app2')
var styleNode = container.getElementsByTagName('style')[0]
scopeCss(styleNode, '#app2')
