import { AES } from '/utils/module/AES.js'
import { sleep } from '/utils/time.js'
function tips(message) {
  document.getElementById('tips').innerHTML += `<li>${message}</li>`
}

async function main() {
  const response = await fetch('/pageDataList.json')
  if (!response.ok) return
  const txt = await response.text()
  tips('1. 压缩原文')
  const txtZip = LZString.compressToBase64(txt)
  tips('2. AES 加密')
  const key = 'e10adc3949ba59ab'
  const iv = 'be56e057f20f883e'
  const a = new AES(key, iv)
  const aesTxt = a.encrypt(txtZip)

  tips('3. 文件传输 - aesTxt')
  await sleep(300) // 模拟传输
  tips('4. 接收文件 - aesTxt')

  tips('5. AES 解密')
  const resTxtZip = a.decrypt(aesTxt)
  tips('6. 解压得到原文')
  const srcStr = LZString.decompressFromBase64(resTxtZip)

  if (srcStr === txt) {
    tips('文件传输成功')
    tips(
      JSON.stringify({
        txt_len: txt.length,
        txtZip_len: txtZip.length,
        aesTxt_len: aesTxt.length
      })
    )
  } else {
    tips('文件损坏')
  }
}
main()
