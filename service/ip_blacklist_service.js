const { Op } = require('sequelize')
const db = require('../models/index')

const { Ip_blacklist } = db.sequelize.models

class ipBlacklistService {
  async checkIp(ctx, next) {
    let ip = ctx.ip
    if (ip.slice(0, 7) === '::ffff:') {
      ip = ip.substr(7)
    }
    let time = new Date()
    let item = await ctx.redis.hget('allHash', `black_ip_${ip}`)
    if (!item) {
      item = await Ip_blacklist.findOne({
        where: {
          ip,
          blacktime: {
            [Op.gte]: time,
          },
        },
      })
      if (item) {
        await ctx.redis.hset('allHash',`black_ip_${ip}`,"YES")
        item = "YES"
      }else {
        await ctx.redis.hset('allHash',`black_ip_${ip}`,"NO")
      }
    }
    
    if (item && item === "YES") {
      ctx.bool = true
    }

    await next()
    if (ctx.it.gType === 0) {
      Ip_blacklist.create({
        ip,
        blacktime: time.setDate(time.getDate() + 3),
      })
      await ctx.redis.hset('allHash',`black_ip_${ip}`,"YES")
    }
  }
}

module.exports = new ipBlacklistService()
