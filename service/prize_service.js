const Joi = require('joi')

const { prizeExpection } = require('../util/httpExpection')
const {houseData} = require('../config/configDefault')
const dayjs = require('dayjs')

const db = require('../models/index')

const { Prize } = db.sequelize.models

class prizeService {
  constructor() {
    this.hash = {}
    this.newHash = {}
  }
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
      sys_status: Joi.string().valid('normal', 'delete').insensitive(),
    })
    try {
      await schema.validateAsync(ctx.v)
    } catch (error) {
      console.log(error)
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
  //读取奖品redis数据
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
  // 重置发奖计划
  async resetPrizeData(data) {
    const {prize_num, left_num, prize_time, time_begin} = data.dataValues
    if (prize_num <0 || left_num<0 ){
      return
    }
    if (prize_time <= 0) {
      return
    }
    const num = Math.floor(prize_num/prize_time)
  
    //每一天的发奖计划重制
    let time = dayjs(time_begin)
    if (num >= 1) {
      for (let index = 1; index <= prize_time; index++) {
        this.hash[time.format('YYYY-MM-DD')] = num
        time =  time.add(1,'day')
      }
      const remainder = prize_num%prize_time
      if (remainder) {
        for (let index = 0; index < remainder; index++) {
          const ran = Math.floor( Math.random()*(1, prize_time))+ 1
          let t = dayjs(time_begin)
          t = t.add(ran, 'day')
          this.hash[t.format('YYYY-MM-DD')] += 1
        }
      }
      for (const it in this.hash) {
        this.setTime(it)
      }
    }
    data.dataValues.prize_data = JSON.stringify(this.newHash)
  }
  //一天24小时的发奖计划
  setTime(it){
    while (this.hash[it]) {
      const day = dayjs(it)
      this.hash[it] -- 
      const ran = Math.floor( Math.random()*(0, 99))
      const d =  day.hour(houseData[ran])
      const item = d.format('YYYY-MM-DD HH:mm:ss')
      if (!this.newHash[item]) {
        this.newHash[item] = 0
      }
      this.newHash[item] += 1
    }
  }
}

module.exports = new prizeService()
