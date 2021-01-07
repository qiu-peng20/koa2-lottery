const router = require('koa-router')()

const Token = require('../util/token')
const luckyConstructor = require('../constructor/lucky_constructor')
const ipBlacklistService = require('../service/ip_blacklist_service')
const usersignService = require('../service/usersign_service')
const ipService = require('../service/ip_service')
const blacklistService = require('../service/blacklist_service')
const recodingsService = require('../service/recodings_service')
const couponService = require('../service/coupon_service')

router.prefix('/lucky')

router.use(Token.checkToken)

//用户参与次数验证
router.use(usersignService.checkUser)

//ip参与次数验证
router.use(ipService.checkIp)

//ip黑名单
router.use(ipBlacklistService.checkIp)

//用户黑名单
router.use(blacklistService.checkUser)

//抽奖接口
router.get('/getPrize', luckyConstructor.prizeGet)

//礼品的颁发
router.use(couponService.setCoupon)

//中奖纪录
router.use(recodingsService.createData)

module.exports = router
