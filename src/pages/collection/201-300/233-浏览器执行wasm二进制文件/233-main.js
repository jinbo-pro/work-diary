/**
 * 1.字符串方式加载
 */

WebAssembly.compile(
  new Uint8Array(
    `
  00 61 73 6d  01 00 00 00  01 0c 02 60  02 7f 7f 01
  7f 60 01 7f  01 7f 03 03  02 00 01 07  10 02 03 61
  64 64 00 00  06 73 71 75  61 72 65 00  01 0a 13 02
  08 00 20 00  20 01 6a 0f  0b 08 00 20  00 20 00 6c
  0f 0b`
      .trim()
      .split(/[\s\r\n]+/g)
      .map((str) => parseInt(str, 16))
  )
).then((module) => {
  const instance = new WebAssembly.Instance(module)
  console.log(instance.exports, '-->>> 1');
  const { add, square } = instance.exports

  console.log('4 + 8 =', add(4, 8))
  console.log('5^2 =', square(5))
  console.log('(4 + 8)^2 =', square(add(4 + 8)))
})

/**
 * 2. .wasm 文件加载
 */
;(async function () {
  const response = await fetch('/assets/add.wasm')
  const buffer = await response.arrayBuffer()
  const module = await WebAssembly.instantiate(buffer)
  console.log(module.instance.exports, '-->>> add.wasm')
  const { add } = module.instance.exports
  const result = add(2, 3)
  console.log('Result:', result)
})()
