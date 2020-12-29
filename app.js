const Koa = require('koa')
const checkError = require('./util/check')

const initProject = require('./util/init')

const app = new Koa()

//logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//错误处理器
app.use(checkError)

//初始化项目
initProject.init(app)

module.exports = app
