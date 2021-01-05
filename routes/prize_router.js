const router = require('koa-router')()
const PrizeContructor = require('../constructor/prize_constructor')
const FRONT = 'prize'
const Token = require('../util/token')
const prizeService =  require('../service/prize_service')

router.prefix(`/${FRONT}`)

router.use(Token.checkToken)

router.get('/', PrizeContructor.getList)
router.get('/detail/:id', PrizeContructor.getDetail)
router.put('/:id', PrizeContructor.upData)
router.post('/', PrizeContructor.createData)
router.delete('/:id', PrizeContructor.deleteData)

router.get('/test', prizeService.setPrizePool)

module.exports = router
