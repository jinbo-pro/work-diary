function sleep(t = 500) {
  return new Promise((a) => setTimeout(a, t))
}
async function main() {
  // 单个错误监听避免导致整个函数错误
  await sleep().catch((err) => {
    console.log('可以单个监听错误 如果不监听那么该错误将被当前 async 捕获')
  })
  await 1 // 简单值 会自动转为 promise.resolve(value)
  await 'string'
  return 1
}

main().then((res) => {
  console.log(res, '-->>> 678')
})
