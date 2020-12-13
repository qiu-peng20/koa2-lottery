const router = require('koa-router')()

const PrizeContructor = require('../contructor/prize_contructor')

router.prefix('/prize')

router.get('/', PrizeContructor.getList)

router.get('/:id', PrizeContructor.getDetail)

router.post('/', PrizeContructor.createData)

router.put('/:id', PrizeContructor.updata)

router.delete('/:id', PrizeContructor.deleteData)

module.exports = router
