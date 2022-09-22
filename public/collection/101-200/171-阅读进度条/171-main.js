console.log('171-阅读进度条')

// 列表
function getList(count = 10) {
  let result = Mock.mock({
    [`data|${count}`]: [
      {
        'id|+3': 99, // id
        name: '@cname()', // 名字
        headerImg: '@image("50x50")', // 头像
        content: '@cparagraph(1, 2)' // 简介
      }
    ]
  })
  return result.data
}
// 创建列表
const list = getList(50)
const app = document.createElement('div')
app.id = 'app'
for (let item of list) {
  const div = document.createElement('div')
  div.className = 'item_box'
  div.innerHTML = `<img src="${item.headerImg}">${item.content}`
  app.append(div)
}
document.body.append(app)
