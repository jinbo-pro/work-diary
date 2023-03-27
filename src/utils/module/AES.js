/*
 * AES加密介绍
 * AES加密模式：   CBC
 * 填充：          Pkcs7
 * 密钥长度：      128
 * 密钥：          d01619da751e9e3f
 * 偏移：          a4e6da2825371f13
 * 输出类型：      base64
 * 字符集：        utf8
 * 原文：          123abc
 * 密文：          2YGarL98FkhinMSvhBaX4Q==
 * 测试地址：      http://tool.chacuo.net/cryptaes
 *
 * 前端依赖：      crypto-js
 * 依赖详情：      https://www.npmjs.com/package/crypto-js
 * 服务端代码demo：
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html
 */

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
