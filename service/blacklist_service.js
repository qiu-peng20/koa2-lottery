const db = require('../models/index')

const { Blacklist } = db.sequelize.models
const Time = require('../cora/getDate')
const { Op } = require('sequelize')

class blacklistService {
  async checkUser(ctx, next) {
    const { user_id } = ctx.v
    const data = await Blacklist.findOne({
      where: {
        user_id,
        blacktime: {
          [Op.gte]: Time,
        },
      },
    })
    if (data) {
      ctx.bool = true
    }
    await next()
    let ip = ctx.ip
    if (ip.slice(0, 7) === '::ffff:') {
      ip = ip.substr(7)
    }
    if (ctx.it.gType === 0) {
      Blacklist.create({
        user_id: ctx.v.user_id,
        blacktime: time.setDate(time.getDate() + 3),
        sys_ip: ip,
      })
    }
  }
}

module.exports = new blacklistService()
