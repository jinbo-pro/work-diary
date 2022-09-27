/**
 * 创建模型选择
 * @param {any[]} modeList
 */
function createModeCheckDom(modeList) {
  const modeBox = document.createElement('ol')
  modeBox.id = 'modeBox'
  for (let item of modeList) {
    const li = document.createElement('li')
    li.innerText = item.name
    li.onclick = function () {
      createLive2d(item.url)
    }
    modeBox.append(li)
  }
  document.body.append(modeBox)
}
/**
 * 创建live2d动画
 * @param {string} jsonPath
 */
function createLive2d(jsonPath) {
  // 更多配置参考: https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init
  let config = {
    display: {
      position: 'right',
      width: 150,
      height: 300,
      hOffset: 0,
      vOffset: -20
    },
    mobile: {
      show: true,
      scale: 0.5
    },
    react: {
      opacityDefault: 0.7,
      opacityOnHover: 0.2
    }
  }
  if (jsonPath) {
    config.model = {
      jsonPath,
      scale: 1
    }
  }
  L2Dwidget.init(config)
}
