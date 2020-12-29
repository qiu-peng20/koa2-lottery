const Joi = require('joi')

const { prizeExpection } = require('../util/httpExpection')
const Time = require('../cora/getDate')

const db = require('../models/index')

const { Prize } = db.sequelize.models

class prizeService {
  async checkPrize(ctx) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      prize_num: Joi.number().integer().required(),
      prize_time: Joi.number().integer().required(),
      prize_code: Joi.string().required(),
      displayOrder: Joi.number().integer().required(),
      gType: Joi.string()
        .valid('virtual_currency', 'virtual_volume', 'small_prize', 'big_prize')
        .insensitive()
        .required(),
      time_begin: Joi.date().less(ctx.v.time_end),
      time_end: Joi.date().greater(ctx.v.time_begin),
      sys_status: Joi.string().valid('normal', 'delete').insensitive(),
    })
    try {
      await schema.validateAsync(ctx.v)
    } catch (error) {
      throw new prizeExpection(error.details[0].message)
    }
  }

  async checkCoupon(ctx, next) {
    const data = await Prize.findOne({
      where: {
        gType: 2,
      },
    })
    if (!data) {
      throw new prizeExpection('请先创建优惠券这个奖品')
    }
    ctx.prize = data
    await next()
  }
  //缓存
  async setData(ctx, data) {
    if (!data || data.length <= 0) {
      return
    }
    const list = JSON.stringify(data) //序列化
    await ctx.redis.set('allList', list)
  }
  //读取
  async getData(ctx) {
    const data = await ctx.redis.get('allList')
    if (data) {
      return JSON.parse(data)
    } else {
      return
    }
  }
  async upData(ctx) {
    await ctx.redis.del('allList')
  }
}

module.exports = new prizeService()
