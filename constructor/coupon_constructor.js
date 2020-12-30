const db = require('../models/index')

const { Coupon, Prize } = db.sequelize.models

const couponService = require('../service/coupon_service')

class couponConstructor {
  async createData(ctx, next) {
    await couponService.checkCoupon(ctx, next)
    const data = await Coupon.create({
      code: ctx.v.code,
      status: 0,
      gift_id: ctx.prize.dataValues.id,
    })
    const it = await Prize.findOne({
      where: {
        id: ctx.prize.dataValues.id,
      },
    })
    it.increment(['prize_num', 'left_num'])
    await ctx.redis.sadd('allSet',data.dataValues.id)
    ctx.body = data
  }

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
