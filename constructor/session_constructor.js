const { loginExpection ,createExpection} = require('../util/httpExpection')
const Token = require('../util/token')

const db = require('../models/index')
const { Users } = db.sequelize.models

class SessionConstructor {
  async login(ctx) {
    const { name, password } = ctx.request.body
    const data = await Users.findOne({
      where: {
        name
      }
    })
    if (!data) {
      throw new loginExpection()
    }
    if (password !== data.dataValues.password) {
      throw new createExpection('用户密码不正确',10009)
    }
    const token = await Token.setToken(ctx,data.dataValues.id)
    ctx.body = {
      token,
    }
  }
  async create(ctx) {
    const { name, password } = ctx.request.body
    const data =  await Users.findOne({
      where: {
        name
      }
    })
    if (data) {
      throw new createExpection()
    }
    const user = await Users.create({
      name,
      password
    })
    ctx.body = user
  }
}

module.exports = new SessionConstructor()
