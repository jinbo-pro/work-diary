import { previewCode } from '/utils/module/previewCode.js'
async function main() {
  const mdStrList = []
  const list = ['./Gold.ts', './testGold.ts', './testGold.ts', './unit-plus.ts', './unit.ts']
  let index = 1
  for (let item of list) {
    const response = await fetch(item)
    const code = await response.text()
    mdStrList.push(`# ${index++} ${item}\n` + '```ts\n' + code + '\n```')
  }
  previewCode(mdStrList.join('\n\n'))
}
main()
