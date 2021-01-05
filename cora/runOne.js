const schedule = require('node-schedule')
const prizeService = require('../service/prize_service')

async function runOne(ctx,next) {
    let rule = new schedule.RecurrenceRule()
    rule.second = [0,10,20,30,40,50]
    const j = schedule.scheduleJob(rule, ()=>{
        prizeService.setPrizePool(ctx)
    })
    await next()
}

module.exports = runOne