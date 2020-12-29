const { maxNum } = require('../config/configDefault')
const { userExpection } = require('../util/httpExpection')

class ipService {
  async checkIp(ctx, next) {
    let ip = ctx.ip
    if (ip.slice(0, 7) === '::ffff:') {
      ip = ip.substr(7)
    }
    const key = await ctx.redis.hget('black_ips', `${ip}`)
    if (key && key.ip > maxNum) {
      throw new userExpection('该ip的抽奖次数已经用完', 10031)
    }
    await next()
    await ctx.redis.hincrby('black_ips', `${ip}`, 1)
  }
}

module.exports = new ipService()
