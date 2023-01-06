;(function () {
  /**
   * 存档导入导出
   */
  const box = document.createElement('div')
  const exportBtn = document.createElement('button')
  const importBtn = document.createElement('button')
  box.style.position = 'fixed'
  box.style.top = '10px'
  box.style.right = '10px'
  box.style.zIndex = 999
  box.style.opacity = 0.5

  exportBtn.innerText = '导出'
  exportBtn.onclick = function () {
    const json = Object.keys(localStorage).reduce((p, c) => {
      p[c] = localStorage.getItem(c)
      return p
    }, {})
    console.log(json, '-->>> json')
    const fileName = `save_${Date.now()}.txt`
    const file = new File([JSON.stringify(json)], fileName, { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
  }

  importBtn.innerText = '导入'
  importBtn.onclick = function () {
    const input = document.createElement('input')
    input.type = 'file'
    input.click()
    input.onchange = function (f) {
      const reader = new FileReader()
      reader.readAsText(f.target.files[0])
      reader.onload = function (e) {
        const text = e.target.result
        let json = null
        try {
          json = JSON.parse(text)
          for (let key in json) {
            localStorage.setItem(key, json[key])
          }
          location.reload()
        } catch (error) {
          console.error(error)
          console.log('导入失败！存档损坏')
        }
      }
    }
  }

  box.append(exportBtn)
  box.append(importBtn)
  document.body.append(box)
})()
