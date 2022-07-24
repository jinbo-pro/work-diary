/**
 * aes 加密
 * @param {string} key 密匙
 * @param {string} iv 偏移
 * @param {string} data 内容
 * @returns
 */
export function encrypt(key, iv, data) {
  // 统一将传入的字符串转成UTF8编码
  const dataHex = CryptoJS.enc.Utf8.parse(data) // 需要加密的数据
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse(iv) // 偏移量
  const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7
  })
  let encryptedVal = encrypted.ciphertext.toString()
  return encryptedVal //  返回加密后的值
}
/**
 * 解密
 * @param {string} key 密匙
 * @param {string} iv 偏移
 * @param {string} encryptedVal 内容
 * @returns
 */
export function decrypt(key, iv, encryptedVal) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedVal)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse(iv) // 偏移量
  let decrypt = CryptoJS.AES.decrypt(srcs, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
