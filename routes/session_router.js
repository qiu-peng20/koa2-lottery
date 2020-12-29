const SessionConstructor = require('../constructor/session_constructor')

const router = require('koa-router')()

const SessionContructor = require('../constructor/session_constructor')

router.prefix('/session')

router.post('/login', SessionContructor.login)

module.exports = router
