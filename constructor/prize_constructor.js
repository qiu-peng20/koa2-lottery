const db = require('../models/index')

const { Prize } = db.sequelize.models

const {
  prizeExpection,
  successExpection,
  idExpection,
} = require('../util/httpExpection')

const prizeService = require('../service/prize_service')
const { Op } = require('sequelize')

class PrizeContructor {
  async getList(ctx) {
    const list = await Prize.findAll()
    ctx.body = list
  }
  async getDetail(ctx) {}
  async createData(ctx) {
    await prizeService.checkPrize(ctx) //初步检测
    const { title, prize_num } = ctx.v
    const it = await Prize.findOne({
      where: {
        title,
      },
    })
    if (it) {
      throw new prizeExpection('该奖品名字已经被使用过了', 10042)
    }
    const data = Prize.build(ctx.v)
    if (prize_num > 0) {
      data.dataValues.left_num = prize_num
    }
    await data.save()
    prizeService.upData(ctx)
    throw new successExpection()
  }
  async upData(ctx) {
    const { title, prize_num } = ctx.v
    const data = ctx.params
    if (title) {
      const it = await Prize.findOne({
        where: {
          id: {
            [Op.ne]: data.id,
          },
          title,
        },
      })
      if (it) {
        throw new prizeExpection('该奖品名字已经被使用过了', 10042)
      }
    }
    if (prize_num && prize_num >= 0) {
      ctx.v.left_num = prize_num
    }
    await Prize.update(ctx.v, {
      where: { id: data.id },
    })
    prizeService.upData(ctx)
    throw new successExpection()
  }
  //删除
  async deleteData(ctx) {
    const data = ctx.params
    const it = await Prize.update(
      { sys_status: 'void' },
      {
        where: {
          id: data.id,
        },
      }
    )
    it.forEach((item) => {
      if (!item) {
        throw new idExpection()
      }
    })
    prizeService.upData(ctx)
    throw new successExpection()
  }
}

module.exports = new PrizeContructor()
