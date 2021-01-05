const db = require('../models/index')

const { Prize } = db.sequelize.models

const { successExpection } = require('../util/httpExpection')

async function switchData(num, ctx) {
  const item = await ctx.redis.hget('Pool', ctx.it.id)
  if (item <= 0) {
    throw new successExpection('没有中奖，谢谢参与')
  }
  const data = await ctx.redis.hincrby('Pool', ctx.it.id, -1)
  if (data < 0) {
    throw new successExpection('没有中奖，谢谢参与')
  }
  const prize = await Prize.findOne({
    where: {
      gType: num,
    },
  })
  prize.decrement(['left_num'])
}

module.exports = switchData
