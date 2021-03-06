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
  async createData(ctx, id, num) {
    let list = []
    for (let index = 0; index < num; index++) {
      list.push({
        code: 123123123,
        status: 0,
        gift_id: id,
      })
    }
    const data = await Coupon.bulkCreate(list)
    data.forEach(async (item) => {
      await ctx.redis.sadd('allSet', item.dataValues.id)
    })
    ctx.body = data
  }
  async upDateData(ctx, num) {
    await Coupon.update(
      { status: 1 },
      {
        where: {
          status: 0,
        },
        limit: num,
      }
    )
    for (let index = 0; index < num; index++) {
      await ctx.redis.spop('allSet')
    }
  }
  async setCoupon(ctx, next) {
    switch (ctx.it.gType) {
      case 2:
        const data = await ctx.redis.scard('allSet')
        if (data <= 0) {
          throw new successExpection('没有中奖，谢谢参与')
        }
        const id = await ctx.redis.spop('allSet')
        await Coupon.update(
          { status: 2 },
          {
            where: {
              id,
            },
          }
        )
        switchData(2, ctx)
        break
      case 0:
        switchData(0, ctx)
        break
      case 1:
        switchData(1, ctx)
        break
    }
    await next()
  }
}

module.exports = new couponService()
