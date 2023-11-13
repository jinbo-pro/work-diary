## 执行已有文件，控制台传参-适合短参数

- main.js

```js
const { exec } = require('child_process')

// 调用临时的vb脚本
exec(`cscript vb.message.vbs "提示" "内容"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行vb脚本时出错: ${error}`)
    return
  }
  if (stderr) {
    console.error(`标准错误输出: ${stderr}`)
  }
  console.log(`标准输出: ${stdout}`)
})
```

- vb.message.vbs

```vb
msgbox WScript.Arguments(1), vbInformation, WScript.Arguments(0)
```

## 临时创建文件-适合长参数

```js
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

// 创建临时的vb脚本文件
const vbScriptContent = `
MsgBox "你好这是中文", vbInformation, "标题"
`
const vbScriptPath = path.resolve(__dirname, `temp_script-${Date.now()}.vbs`)
// 此处必须编码为 Windows 的 ANSI 码才行，不然中文会出现乱码
fs.writeFileSync(vbScriptPath, vbScriptContent, { encoding: 'utf16le' })

// 调用临时的vb脚本
exec(`cscript ${vbScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行vb脚本时出错: ${error}`)
    return
  }
  if (stderr) {
    console.error(`标准错误输出: ${stderr}`)
  }

  console.log(`标准输出: ${stdout}`)

  // 删除临时的vb脚本文件
  fs.unlinkSync(vbScriptPath)
})
```
