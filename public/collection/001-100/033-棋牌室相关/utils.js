/**
 * 创建一副新的牌组
 * @returns list
 */
export function createNewBrand() {
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
export function cleanBrand(list) {
  return list.sort(() => Math.random() - 0.5).slice(0)
}
/**手牌排序 */
export function sortBrandList(list) {
  return list.sort((a, b) => a.index - b.index).slice(0)
}
/**随机点数 */
export function getRanDice() {
  return ~~(Math.random() * 6) + 1
}
/**骰子-组件 */
export const diceCom = {
  template: `
    <div class="box">
      <div v-for="e in 9" :key="e" :class="curDice.includes(e) ? 'dot' : ''"></div>
    </div>
  `,
  props: {
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      list: [[5], [1, 9], [1, 5, 9], [1, 3, 7, 9], [1, 3, 5, 7, 9], [1, 3, 4, 6, 7, 9]]
    }
  },
  computed: {
    curDice() {
      return this.list[this.num - 1]
    }
  }
}
