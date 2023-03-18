/**解析本地文件夹 */
async function handleDirectoryEntry(dirHandle) {
  let list = []
  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file') {
      const file = await entry.getFile()
      list.push({ isFile: 1, name: file.name, file })
    }
    if (entry.kind === 'directory') {
      const children = await handleDirectoryEntry(entry)
      list.push({ isFile: 0, name: entry.name, children })
    }
  }
  return list
}

function getMusicList(treeFileList) {
  let index = 0
  const result = []
  const read = (list) => {
    for (let item of list) {
      if (item.isFile) {
        if (!item.file.name.endsWith('.mp3')) continue
        result.push({
          index: index++,
          user: 'local',
          name: item.file.name,
          url: URL.createObjectURL(item.file),
          cover: 'https://api.isoyu.com/mm_images.php?id=' + index
        })
      } else {
        read(item.children)
      }
    }
  }
  read(treeFileList)
  return result
}

new Vue({
  el: '#app',
  methods: {
    // 加载本地音频数据
    async loadMusic() {
      if (!window.showDirectoryPicker) return alert('浏览器不支持 showDirectoryPicker 方法')
      const dirHandle = await showDirectoryPicker()
      const out = await handleDirectoryEntry(dirHandle)
      /**
       * 更多配置参考：
       * https://aplayer.js.org/#/zh-Hans/
       */
      this.ap = new APlayer({
        container: document.getElementById('player'),
        listFolded: false,
        listMaxHeight: 120,
        audio: getMusicList(out)
      })
    }
  }
})
