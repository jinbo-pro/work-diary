export class AES {
  /**
   * AES 加解密
   * @param {string} key 密匙
   * @param {string} iv 偏移
   */
  constructor(key, iv) {
    this.key = CryptoJS.enc.Utf8.parse(key)
    this.config = {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  }
  /**
   * 加密
   * @param {string} data 内容
   */
  encrypt(data) {
    const dataHex = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(dataHex, this.key, this.config)
    return encrypted.toString()
  }
  /**
   * 解密
   * @param {string} data 密文
   * @returns
   */
  decrypt(data) {
    const decrypt = CryptoJS.AES.decrypt(data, this.key, this.config)
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
