const fs = require('fs')
const body = require('koa-body')
const Redis = require('ioredis')

const { redisDefault } = require('../config/configDefault')

const getRequest = require('./getRequest')

class initProject {
  static init(app) {
    this.initOther(app)
    app.use(getRequest)
    app.use(this.initRedis)
    this.initRouter(app)
  }
  static initOther(app) {
    app.use(body())
    
  }
  static async initRedis(ctx, next) {
    const redis = new Redis(redisDefault)
    ctx.redis = redis
    await next()
  }
  static initRouter(app) {
    fs.readdirSync('routes').forEach((item) => {
      const router = require(`../routes/${item}`)
      app.use(router.routes(), router.allowedMethods())
    })
  }
}

module.exports = initProject
