import Gold from './Gold'

function bigMain(list: string[], type: string) {
  let first = list.splice(0, 1)[0]
  let result = new Gold(first) as any
  for (let item of list) {
    const cur = new Gold(item)
    result = result[type](cur)
  }
  return result.getGold()
}

/**
 * 加 +
 */
const add = (a: string[]) => bigMain(a, 'add')
/**
 * 减 -
 */
const min = (a: string[]) => bigMain(a, 'min')
/**
 * 乘 *
 */
const tim = (a: string[]) => bigMain(a, 'tim')
/**
 * 除 /
 */
const div = (a: string[]) => bigMain(a, 'div')

const list = [
  add(['12', '12']),
  add(['121', '255K']),
  add(['12K', '123K']),
  min(['12M', '1.3']),
  min(['12T', '2.5']),
  min(['6aa', '18']),
  tim(['6aa', '89']),
  tim(['6K', '36M']),
  div(['6M', '1.3']),
  div(['6K', '1.2']),
]

console.log(list, '-->>> 678')
