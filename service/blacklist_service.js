const db = require('../models/index')

const { Blacklist } = db.sequelize.models
const Time = require('../cora/getDate')
const { Op } = require('sequelize')

class blacklistService {
  async checkUser(ctx, next) {
    const { user_id } = ctx.v
    let item = await ctx.redis.hget('allHash', `black_user_${user_id}`)
    if (!item) {
      item = await Blacklist.findOne({
        where: {
          user_id,
          blacktime: {
            [Op.gte]: Time,
          },
        },
      })
      if (item) {
        await ctx.redis.hset('allHash',`black_user_${user_id}`,"YES")
        item = "YES"
      }else {
        await ctx.redis.hset('allHash',`black_user_${user_id}`,"NO")
      }
    }
    if (item && item === "YES") {
      ctx.bool = true
    }
    await next()

    let ip = ctx.ip
    if (ip.slice(0, 7) === '::ffff:') {
      ip = ip.substr(7)
    }
    if (ctx.it.gType === 0) {
      await Blacklist.create({
        user_id: user_id,
        blacktime: Time.setDate(Time.getDate() + 3), //默认拉黑三天
        sys_ip: ip,
      })
      await ctx.redis.hset('allHash',`black_user_${user_id}`, "YES")
    }
  }
}

module.exports = new blacklistService()
