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
    ctx.body = data
  }
  async getList(ctx) {
    const list = await Coupon.findAll()
    ctx.body = list
  }
}

module.exports = new couponConstructor()
