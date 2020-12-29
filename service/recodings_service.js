const db = require('../models/index')

const { Recording } = db.sequelize.models

class recodingService {
  async createData(ctx, next) {
    let ip = ctx.ip
    if (ip.slice(0, 7) === '::ffff:') {
      ip = ip.substr(7)
    }
    await Recording.create({
      gift_id: ctx.it.id,
      gift_name: ctx.it.title,
      gift_type: ctx.it.gType,
      user_id: ctx.v.user_id,
      sys_ip: ip,
      status: ctx.it.sys_status,
    })
    await next()
  }
}

module.exports = new recodingService()
