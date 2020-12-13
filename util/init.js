const body = require('koa-body')
const fs = require('fs')
const Router = require('koa-router')

class initialConfig {
  static init(app) {
    this.routerInit(app)
    this.otherInit(app)
  }
  //注册路由
  static routerInit(app) {
    fs.readdirSync('routes').forEach((item) => {
      const router = require(`../routes/${item}`)
      app.use(router.routes(), router.allowedMethods())
    })
  }
  //其他初始化
  static otherInit(app) {
    app.use(body())
  }
}

module.exports = initialConfig
