const crypto = require('crypto')

/**
 * 生成 md5
 * @param {string} content
 */
function createMd5(content = 'hello md5') {
  return crypto.createHash('md5').update(content).digest('hex')
}
/**
 * 生成 sha1
 * @param {string} content
 */
function createSha1(content = 'hello sha1') {
  return crypto.createHash('sha1').update(content).digest('hex')
}
/**
 * 生成 sha256
 * @param {string} content
 */
function createSha256(content = 'hello sha256') {
  return crypto.createHash('sha256').update(content).digest('hex')
}
/**
 * AES 加密
 * @param {string} key 加密key
 * @param {string} iv 偏移
 * @param {string} data 需要加密的数据
 */
function aesEncrypt(key, iv, data) {
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  var crypted = cipher.update(data, 'utf8', 'binary')
  crypted += cipher.final('binary')
  crypted = Buffer.from(crypted, 'binary').toString('base64')
  return crypted
}
/**
 * AES 解密
 * @param {string} key 解密的key
 * @param {string} iv 偏移
 * @param {string} crypted 密文
 */
function aesDecrypt(key, iv, crypted) {
  crypted = Buffer.from(crypted, 'base64').toString('binary')
  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  var decoded = decipher.update(crypted, 'binary', 'utf8')
  decoded += decipher.final('utf8')
  return decoded
}

module.exports = {
  createMd5, // 生成 md5
  createSha1, // 生成 sha1
  createSha256, // 生成 sha256
  aesEncrypt, // AES 加密
  aesDecrypt // AES 解密
}
