const db = require('../models/index')

const { Prize } = db.sequelize.models
const { successExpection } = require('../util/httpExpection')

async function switchData(num) {
  const prize = await Prize.findOne({
    where: {
      gType: num,
    },
  })
  if (prize.dataValues.left_num <= 0) {
    throw new successExpection('没有中奖，谢谢参与')
  }
  prize.decrement(['left_num'])
}

module.exports = switchData
