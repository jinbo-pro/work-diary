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

new Vue({
  el: '#app',
  data() {
    return {
      isRandom: false,
      keyWord: '',
      activeIndex: 0,
      musicAllList: []
    }
  },
  computed: {
    showList() {
      return this.musicAllList.filter((item) => item.name.includes(this.keyWord))
    },
    curMusic() {
      const cur = this.showList[this.activeIndex]
      return cur || {}
    }
  },
  methods: {
    // 加载本地音频数据
    async loadMusic() {
      if (!window.showDirectoryPicker) return alert('浏览器不支持 showDirectoryPicker 方法')
      const dirHandle = await showDirectoryPicker()
      const out = await handleDirectoryEntry(dirHandle)
      let index = 0
      const read = (list) => {
        for (let item of list) {
          if (item.isFile) {
            if (!item.file.name.endsWith('.mp3')) continue
            this.musicAllList.push({
              index: index++,
              user: 'local',
              name: item.file.name,
              src: URL.createObjectURL(item.file)
            })
          } else {
            read(item.children)
          }
        }
      }
      read(out)
    },
    activeMusic(item, index) {
      this.activeIndex = index
    },
    playMusic() {
      console.log(this.curMusic.name, '-->>> 开始播放')
    },
    // 播放结束-下一首
    endedMusic() {
      console.log(this.curMusic.name, '-->>> 播放结束')
      this.nextMusic()
    },
    nextMusic() {
      if (this.isRandom) {
        this.activeIndex = ~~(Math.random() * this.showList.length)
        return
      }
      if (this.activeIndex == this.showList.length - 1) {
        this.activeIndex = 0
      } else {
        this.activeIndex++
      }
    }
  }
})
