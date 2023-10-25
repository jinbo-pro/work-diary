// 计算斐波那契数列的第 n 项
function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

// 监听主线程 postMessage 的消息
self.addEventListener('message', function (e) {
  const num = e.data

  // 计算斐波那契数列的第 num 项
  const result = fibonacci(num)

  // 向主线程发送消息
  self.postMessage(result)
})
