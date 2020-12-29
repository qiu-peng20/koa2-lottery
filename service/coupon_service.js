const Joi = require('joi')

const db = require('../models/index')
const { Coupon } = db.sequelize.models

const { successExpection } = require('../util/httpExpection')
const { prizeExpection } = require('../util/httpExpection')
const switchData = require('../cora/switch')

class couponService {
  async checkCoupon(ctx, next) {
    const schema = Joi.object({
      code: Joi.string().required().min(4).max(10),
    })
    try {
      await schema.validateAsync(ctx.v)
    } catch (err) {
      throw new prizeExpection(err.details[0].message)
    }
    await next()
  }
  async setCoupon(ctx, next) {
    switch (ctx.it.gType) {
      case 2:
        const data = await Coupon.findOne({
          where: {
            status: 0,
          },
        })
        if (!data) {
          throw new successExpection('没有中奖，谢谢参与')
        }
        data.update({
          status: 2,
        })
        switchData(2)
        break
      case 0:
        switchData(0)
        break
      case 1:
        switchData(1)
        break
    }

    await next()
  }
}

module.exports = new couponService()
