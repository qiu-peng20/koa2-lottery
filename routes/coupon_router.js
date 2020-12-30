const router = require('koa-router')()
const couponConstructor = require('../constructor/coupon_constructor')
const prizeService = require('../service/prize_service')

router.prefix('/coupon')

router.get('/list', couponConstructor.getList)

router.get('/synchronous', couponConstructor.setRCoupon)

router.use(prizeService.checkCoupon)

router.post('/create', couponConstructor.createData)

module.exports = router
