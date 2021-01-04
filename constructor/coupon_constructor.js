const db = require('../models/index')

const { Coupon, Prize } = db.sequelize.models

const couponService = require('../service/coupon_service')

class couponConstructor {

  async setRCoupon(ctx) {
    const data = await Coupon.findAll({
      where: {
        status: 0
      }
    })
    const item = await ctx.redis.scard('allSet')
    if (item !== data) {
      data.forEach(async it => {
        await ctx.redis.sadd('oldSet',it.dataValues.id)
      })
    }
    await ctx.redis.rename('oldSet','allSet')
  }

  async getList(ctx) {
    const list = await Coupon.findAll()
    ctx.body = list
  }
}

module.exports = new couponConstructor()
