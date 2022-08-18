import { lzw_compress, lzw_decompress } from './LZW.js'

$('#Compress').on('click', function () {
  const src = $('#source').val()
  const result = lzw_compress(src)
  $('#result').val(result)
  const s = src.length
  const r = result.length
  $('#info').innerHTML = `源：${s}，值：${r}，压缩比${(r / s).toFixed(3)}`
})

$('#DeCompress').on('click', function () {
  const resultCode = $('#result').val()
  const srcCode = lzw_decompress(resultCode)
  $('#source').val(srcCode)
})
