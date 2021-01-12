const db = require('../models/index')
const { userExpection } = require('../util/httpExpection')
const { maxNum } = require('../config/configDefault')

const nowTime = require('../cora/getDate')

const { Usersign } = db.sequelize.models

class usersignService {
  async checkUser(ctx, next) {
    const { user_id } = ctx.v
    let it = await ctx.redis.hget('allUser', user_id)
    if (!it) {
      it = await Usersign.findOrCreate({
        where: {
          user_id,
          day: nowTime,
        },
        defaults: {
          num: 1,
          day: nowTime,
        },
      })
      if (it && it[0].dataValues.num > maxNum) {
        throw new userExpection()
      }
    }else {
      if (it > maxNum) {
        throw new userExpection()
      }
    }
    await next()
    await ctx.redis.hincrby('allUser',user_id,1)
    ctx.body = {
      title: `恭喜中奖，奖品为${ctx.it.title}`,
      index: ctx.it.displayOrder
    }
  }

  async removeAllUser(ctx) {
    const array =  await ctx.redis.hkeys('allUser')
    for (let index = 0; index < array.length; index++) {
      await ctx.redis.hdel('allUser',array[index])
    }
  }
}

module.exports = new usersignService()
