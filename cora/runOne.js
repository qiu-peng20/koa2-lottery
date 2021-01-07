const schedule = require('node-schedule')
const prizeService = require('../service/prize_service')
const usersignService = require('../service/usersign_service')


function runPool(ctx) {
    let rule = new schedule.RecurrenceRule()
    rule.minute = 2
    rule.second = 0
    console.log('设置奖品池任务正在启动')
    const data =  schedule.scheduleJob(rule, () => {
        prizeService.setPrizePool(ctx)
    })
    console.log('设置奖品池任务已经启动')
}

function  runRemove(ctx) {
    let rule = new schedule.RecurrenceRule()
    rule.minute = 0
    rule.second = 0
    rule.hour = 0
    console.log('清空用户和ip今日抽奖次数缓存任务正在开启')
    schedule.scheduleJob(rule, () => {
        usersignService.removeAllUser(ctx)
    })
    console.log('清空用户和ip今日抽奖次数缓存任务已经开启')
}
async function runOne(ctx, next) {
  runPool(ctx)
  runRemove(ctx)
  await next()
}



module.exports = runOne
