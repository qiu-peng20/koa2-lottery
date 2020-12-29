const db = require('../models/index')

const { Prize } = db.sequelize.models
const { successExpection } = require('../util/httpExpection')
const prizeService = require('../service/prize_service')
const Time = require('../cora/getDate')
const { Op } = require('sequelize')

class luckyConstructor {
  async prizeGet(ctx, next) {
    const num = Math.floor(Math.random() * 10000) //生成抽奖编码
    let prizeList = await prizeService.getData(ctx)
    if (!prizeList) {
      prizeList = []
      const list = await Prize.findAll({
        where: {
          sys_status: 'normal',
          time_begin: {
            [Op.lte]: Time,
          },
          time_end: {
            [Op.gte]: Time,
          },
        },
        order: [['gType', 'ASC']],
      })
      list.forEach((item) => {
        prizeList.push(item.dataValues)
      })

      prizeService.setData(ctx, prizeList)
    }
    let it
    for (let index = 0; index < prizeList.length; index++) {
      if (
        prizeList &&
        prizeList[index] &&
        prizeList[index].prize_code > num &&
        !ctx.bool
      ) {
        it = prizeList[index]
        break
      }
    }
    if (!it) {
      throw new successExpection('没有中奖，谢谢参与')
    }
    ctx.it = it
    await next()
  }
}

module.exports = new luckyConstructor()
