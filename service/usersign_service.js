const db = require('../models/index')
const { userExpection } = require('../util/httpExpection')
const { maxNum } = require('../config/configDefault')

const nowTime = require('../cora/getDate')

const { Usersign } = db.sequelize.models

class usersignService {
  async checkUser(ctx, next) {
    const { user_id } = ctx.v
    const [usersign] = await Usersign.findOrCreate({
      where: {
        user_id,
        day: nowTime,
      },
      defaults: {
        num: 1,
        day: nowTime,
      },
    })
    if (usersign && usersign.num > maxNum) {
      throw new userExpection()
    }
    await next()
    await Usersign.update(
      { num: ++usersign.num },
      {
        where: {
          user_id,
          day: nowTime,
        },
      }
    )
    ctx.body = {
      title: `恭喜中奖，奖品为${ctx.it.title}`,
    }
  }
}

module.exports = new usersignService()
