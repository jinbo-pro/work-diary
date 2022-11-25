/*
 *  使用方法
 *  将以下代码复制到一个js文件中，然后在入口文件main.js中import引入即可；
 *  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
 */
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    let draging = false
    let dragDom
    let dragpoint = { x: 0, y: 0 }
    let dialogHeaderEl = el.querySelector('.el-dialog__header')
    dialogHeaderEl.style.cursor = 'move'
    dialogHeaderEl.addEventListener('mousedown', (ev) => {
      let target = ev.target
      //由于点击关闭按钮会事件冒泡，取消拖拽
      if (target.classList.contains('el-dialog__close')) {
        return
      }
      draging = true
      dragDom = el.querySelector('.el-dialog')
      //自定义样式，让弹窗在拖拽过程中鼠标指针变成十字移动
      dragDom?.classList.add('draging')
      dragpoint = {
        x: ev.clientX,
        y: ev.clientY
      }
    })
    document.addEventListener('mouseup', (ev) => {
      draging = false
      dragDom?.classList.remove('draging')
      dragDom = null
    })
    document.addEventListener('mousemove', (ev) => {
      if (draging) {
        let _dragdom = dragDom
        let sty = window.getComputedStyle(_dragdom, null)
        _dragdom.style.marginLeft = `${parseFloat(sty.marginLeft) + ev.clientX - dragpoint.x}px`
        let marginTop = parseFloat(sty.marginTop) + ev.clientY - dragpoint.y
        dragpoint = {
          x: ev.clientX,
          y: ev.clientY
        }
        //往上拖拽不能超出屏幕
        if (marginTop <= 0) {
          marginTop = 0
        }
        _dragdom.style.marginTop = `${marginTop}px`
      }
    })
  }
})
