## 与 JSEncrypt 配套的 nodejs rsa 方案如下

```js
const NodeRSA = require('node-rsa')

/**
 * 创建公/私钥对
 * @param {number} b 密匙位数
 * @returns
 */
function createRsaKey(b = 1024) {
  const rsa = new NodeRSA({ b })
  return {
    publicKey: rsa.exportKey('pkcs8-public'),
    privateKey: rsa.exportKey('pkcs8-private')
  }
}
/**
 * 公钥加密
 * @param {string} data 原文
 * @param {string} publicKey 公钥
 */
function rsaEncrypt(data, publicKey) {
  const nodersa = new NodeRSA(publicKey)
  nodersa.setOptions({ encryptionScheme: 'pkcs1' })
  return nodersa.encrypt(data, 'base64')
}
/**
 * 私钥解密
 * @param {string} data 密文
 * @param {string} privateKey 私钥
 */
function rsaDecrypt(data, privateKey) {
  const nodersa = new NodeRSA(privateKey)
  nodersa.setOptions({ encryptionScheme: 'pkcs1' })
  return nodersa.decrypt(data, 'utf8')
}

module.exports = {
  createRsaKey,
  rsaEncrypt,
  rsaDecrypt
}
```
