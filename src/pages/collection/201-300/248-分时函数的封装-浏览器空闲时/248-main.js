import { browserPerformChunk } from './performChunk.js'
const count = 1e5

// 直接插入
document.getElementById('btn1').onclick = function () {
  const ol = document.createElement('ol')
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li')
    li.innerText = i
    ol.appendChild(li)
  }
  document.body.appendChild(ol)
}

// 分时片段执行插入
document.getElementById('btn2').onclick = function () {
  const list = Array(count).fill(1)
  const ol = document.createElement('ol')
  browserPerformChunk(list, (e, i) => {
    const li = document.createElement('li')
    li.innerText = i
    ol.appendChild(li)
  })
  document.body.appendChild(ol)
}
