const jwt = require('jsonwebtoken')

const { tokenKey } = require('../config/configDefault')
const { tokenExpection, sessionExpection } = require('./httpExpection')

class Token {
  static setToken(ctx) {
    const token = jwt.sign(
      {
        level: 1,
      },
      tokenKey,
      { expiresIn: '2h' }
    )
    ctx.redis.set('token', token)
    return token
  }

  static async checkToken(ctx, next) {
    if (!ctx.header.authorization) {
      throw new tokenExpection('token不正确', 10011)
    }
    const token = ctx.header.authorization.split(' ')[1]
    const oldToken = await ctx.redis.get('token')
    if (!oldToken) {
      throw new sessionExpection()
    }
    if (token !== oldToken) {
      throw new tokenExpection('token不正确', 10011)
    }
    jwt.verify(token, tokenKey, function (err) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new tokenExpection()
        }
      }
    })
    await next()
  }
}

module.exports = Token
