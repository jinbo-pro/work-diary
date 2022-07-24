const jwt = require('jsonwebtoken')

// 撒盐：加密的时候混淆 | 密钥
const secret = '6q0U4OBG46mH14Ui'

/**
 * 创建 Token
 */
function jwtToken(data, expiresIn = '24h') {
  // JWT 格式 token | 有效时间 24 小时
  return jwt.sign(data, secret, { expiresIn })
}

/**
 * 验证 token 结果 (验证 secret 和 检查有效期 exp)
 */
const jwtVerify = (token) => {
  return jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      switch (error.name) {
        // token 过期 eg: { code: 401, name: 'TokenExpiredError', message: 'jwt expired' } | 401 token 过期
        case 'TokenExpiredError':
          return { code: 401, ...error }
        // token 错误
        case 'JsonWebTokenError':
          return { code: 400, ...error }
        default:
          return error
      }
    } else {
      // 验证成功 eg：{ userId: '5cd7b5159ea7ac253029178d', iat: 1557640469, exp: 1557644069 } | iat（创建的时间戳），exp（到期时间戳）
      return { code: 0, decoded }
    }
  })
}

module.exports = {
  jwtToken,
  jwtVerify
}
