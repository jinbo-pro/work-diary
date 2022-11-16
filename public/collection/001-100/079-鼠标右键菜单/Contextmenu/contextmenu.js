import { guid } from '/utils/easyHash.js'
import ContextmenuComponent from './index.vue'

const CTX_CONTEXTMENU_HANDLER = 'CTX_CONTEXTMENU_HANDLER'

const contextmenuListener = (el, event, binding) => {
  event.stopPropagation()
  event.preventDefault()

  const menus = binding.value(el)
  if (!menus) return

  let container = null

  // 移除右键菜单并取消相关的事件监听
  const removeContextmenu = () => {
    if (container) {
      container.$destroy()
      const de = container.$el
      de.parentNode && de.parentNode.removeChild(de)
      container = null
    }
    el.classList.remove('contextmenu-active')
    document.body.removeEventListener('scroll', removeContextmenu)
    window.removeEventListener('resize', removeContextmenu)
  }

  // 创建自定义菜单
  const options = {
    axis: { x: event.x, y: event.y },
    el,
    menus,
    removeContextmenu
  }
  const dom = document.createElement('div')
  const id = 'dom_' + guid()
  dom.id = id
  const InstanceVue = Vue.extend(ContextmenuComponent)
  document.body.appendChild(dom)
  container = new InstanceVue({ propsData: options }).$mount(`#${id}`)

  // 为目标节点添加菜单激活状态的className
  el.classList.add('contextmenu-active')

  // 页面变化时移除菜单
  document.body.addEventListener('scroll', removeContextmenu)
  window.addEventListener('resize', removeContextmenu)
}

const ContextmenuDirective = {
  bind(el, binding) {
    el[CTX_CONTEXTMENU_HANDLER] = (event) => contextmenuListener(el, event, binding)
    el.addEventListener('contextmenu', el[CTX_CONTEXTMENU_HANDLER])
  },

  unbind(el) {
    if (el && el[CTX_CONTEXTMENU_HANDLER]) {
      el.removeEventListener('contextmenu', el[CTX_CONTEXTMENU_HANDLER])
      delete el[CTX_CONTEXTMENU_HANDLER]
    }
  }
}

export default ContextmenuDirective
