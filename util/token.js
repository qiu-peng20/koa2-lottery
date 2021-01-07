const jwt = require('jsonwebtoken')

const { tokenKey } = require('../config/configDefault')
const { tokenExpection, sessionExpection } = require('./httpExpection')

class Token {
  static async setToken(ctx,id) {
    const token = jwt.sign(
      {
        user_id: `${id}`,
      },
      tokenKey,
      { expiresIn: '20h' }
    )
    await ctx.redis.sadd('allToken', token)
    return token
  }

  static async checkToken(ctx, next) {
    if (!ctx.header.authorization) {
      throw new tokenExpection('token没有传', 10011)
    }
    const token = ctx.header.authorization.split(' ')[1]
    const oldToken = await ctx.redis.sismember('allToken',token)
    if (!oldToken) {
      throw new sessionExpection()
    }
    jwt.verify(token, tokenKey, function (err,decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new tokenExpection()
        }
      }else{
        const {user_id} = decoded
        ctx.v.user_id = user_id
      }
    })
    await next()
  }
}

module.exports = Token
