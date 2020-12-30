const db = require('../models/index')

const { Prize } = db.sequelize.models
const { successExpection } = require('../util/httpExpection')


async function switchData(num) {

  const prize = await Prize.findOne({
    where: {
      gType: num,
    },
  })
  prize.decrement(['left_num'])
  prizeService.upData()
}

module.exports = switchData
