console.log('177-文件夹上传')
const fileList = document.getElementById('fileList')

/**显示上传的文件 */
function renderFileList(list) {
  console.log(list)
  for (let item of list) {
    const li = document.createElement('li')
    li.innerHTML = `
      <div>name: ${item.name} type: ${item.type}</div>
      <div>webkitRelativePath: ${item.webkitRelativePath}</div>
    `
    fileList.append(li)
  }
}

/**
 * 1. input 上传文件夹
 */
const folderUploader = document.getElementById('folderUploader')
folderUploader.onchange = function (e) {
  renderFileList(Array.from(e.target.files))
}

/**
 * 2. 拖拽上传文件夹
 */
const dropZone = document.getElementById('drop')
dropZone.ondragover = (e) => {
  e.preventDefault()
}

dropZone.ondrop = (e) => {
  e.preventDefault()
  handleDragWrapDrop(e)
}

async function handleDragWrapDrop(event) {
  const { dataTransfer } = event
  if (!dataTransfer) return
  const { files } = dataTransfer

  if (files.length === 1) {
    const { items, files } = dataTransfer
    const item = items[0].webkitGetAsEntry() // 获取当前文件夹的Entry（webkit内核特有），然后去递归Entry
    if (item) {
      // 说明是文件夹
      if (item.isDirectory) {
        const filesList = []
        await scanFiles(item, filesList)
        renderFileList(filesList)
      } else {
        console.log(files, 'files')
      }
    }
  } else {
    console.log('单次拖拽仅支持单个文件上传')
  }
}

/**
 * 扫描文件夹中所有的文件夹子和文件，将数据拍平为可上传使用的File对象
 * @param {DirectoryEntry} entry FileSystemDirectoryEntry 对象实例（目录实体）
 * @param {File[]} filesList 文件列表
 * @returns 
 */
function scanFiles(entry, filesList) {
  return new Promise((resolve, reject) => {
    if (entry.isDirectory) {
      const directoryReader = entry.createReader()
      directoryReader.readEntries(async (entries) => {
        entries.forEach(async (entry, index) => {
          await scanFiles(entry, filesList)
          if (index === entries.length - 1) {
            resolve(1)
          }
        })
      }, reject)
    } else {
      entry.file(async (file) => {
        const path = entry.fullPath.substring(1)
        /**
         * 修改webkitRelativePath 是核心操作，原因是拖拽的事件体中webkitRelativePath是空的，
         * 而且webkitRelativePath 是只读属性，普通赋值是不行的。
         * 所以目前只能使用这种方法将entry.fullPath 赋值给webkitRelativePath
         */
        const newFile = Object.defineProperty(file, 'webkitRelativePath', { value: path })
        filesList.push(newFile)
        resolve(1)
      }, reject)
    }
  })
}
