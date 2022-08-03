/**
 * 创建一副新的牌组
 * @returns list
 */
function createNewBrand() {
  let numList = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  let typeList = ['heart', 'spade', 'flower', 'block']
  let result = [
    { num: '0', type: 'heart', index: 100 },
    { num: '0', type: 'spade', index: 100 }
  ]
  numList.forEach((num, index) => {
    for (let type of typeList) {
      result.push({ num, type, index })
    }
  })
  return result
}
/**
 * 洗牌
 * @param {any} list 牌组
 * @returns
 */
function cleanBrand(list) {
  return list.sort(() => Math.random() - 0.5).slice(0)
}

function sortBrandList(list) {
  return list.sort((a, b) => a.index - b.index).slice(0)
}

/**
 * 数组等距拆分
 * @param {array} orgArr
 * @param {number} size
 * @return {array}
 */
function arrayChunk(orgArr, size) {
  size = parseInt(size)
  if (isNaN(size) || size < 1 || size >= orgArr.length) {
    return orgArr
  }
  let newArr = []
  for (let i = 0, len = orgArr.length; i < len; i += size) {
    newArr.push(orgArr.slice(i, i + size))
  }
  return newArr
}
/**
 * 渲染牌组
 * @param {any} allList
 */
function renderBrand(allList) {
  const typeMap = {
    heart: { icon: '♥', color: 'red' },
    spade: { icon: '♠', color: 'black' },
    flower: { icon: '♣', color: 'black' },
    block: { icon: '♦', color: 'red' }
  }
  const createItemBrand = (list) => {
    return list
      .map((item) => {
        const info = typeMap[item.type]
        return `
                <div class="brand_item" style="color:${info.color}">
                    <div>${item.num == 0 ? 'joker' : item.num}</div>
                    <div>${info.icon}</div>
                </div> `
      })
      .join('')
  }
  $('#box').empty()
  allList.forEach((item, index) => {
    $('#box').append(`
            <p>${index + 1}</p>
            <div class="brand_list">
                ${createItemBrand(item)}
            </div>
        `)
  })
}
/**
 * 发牌
 */
function licensing() {
  let list = createNewBrand()
  let list2 = cleanBrand(list)
  let brandListAll = arrayChunk(list2, 17).map((sonList) => sortBrandList(sonList))
  renderBrand(brandListAll)
}

window.onload = licensing

$('#reset').on('click', () => {
  licensing()
})
