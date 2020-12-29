const Joi = require('joi')

const { loginExpection } = require('../util/httpExpection')
const Token = require('../util/token')

class SessionConstructor {
  async login(ctx) {
    const { name, password } = ctx.request.body
    const scheme = Joi.object().keys({
      name: Joi.string().alphanum().min(4).max(20).required(),
      password: Joi.string().regex(/^[A-Z]/),
    })
    try {
      await scheme.validateAsync({ name, password })
    } catch (error) {
      throw new loginExpection(error.details[0].message, 10002)
    }
    if (name !== 'test1') {
      throw new loginExpection()
    }
    if (password !== 'A123456') {
      throw new loginExpection('密码不正确', 10003)
    }
    const token = Token.setToken(ctx)
    ctx.body = {
      token,
    }
  }
}

module.exports = new SessionConstructor()
