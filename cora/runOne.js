const schedule = require('node-schedule')
const prizeService = require('../service/prize_service')

async function runOne(ctx, next) {
  let rule = new schedule.RecurrenceRule()
  rule.minute = 2
  rule.second = 0
  console.log('设置奖品池任务正在启动')
  schedule.scheduleJob(rule, () => {
    prizeService.setPrizePool(ctx)
  })
  console.log('设置奖品池任务已经启动')
  await next()
}

module.exports = runOne
