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

    const data = await Ip_blacklist.findOne({
      where: {
        ip,
        blacktime: {
          [Op.gte]: time,
        },
      },
    })
    if (data) {
      ctx.bool = true
    }
    await next()
    if (ctx.it.gType === 0) {
      Ip_blacklist.create({
        ip,
        blacktime: time.setDate(time.getDate() + 3),
      })
    }
  }
}

module.exports = new ipBlacklistService()
