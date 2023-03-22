async function loadFile() {
  const url = 'https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt'
  const response = await fetch(url)

  // 由于文件较大或客户端网络速度比较慢时导致加载时间过长
  // const text = await response.text()
  // console.log(text, '-->>> text')

  // 采用分块读取获取一点就渲染一点
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    const text = decoder.decode(value)

    const p = document.createElement('p')
    p.innerText = text.length
    document.body.append(p)
  }
}

loadFile()
