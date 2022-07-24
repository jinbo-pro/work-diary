console.log('123-ionicons小图标')

import { icons } from './icons.js'

var box = $('.box')
for (let item of icons) {
  let str = `<ion-icon name="${item}"></ion-icon>`
  let icon = $(`
    <div class="icon_box">
      ${str}
      <p>${item}</p>
    </div>
  `)
  icon.on('click', () => {
    console.log(str)
  })
  box.append(icon)
  
}
