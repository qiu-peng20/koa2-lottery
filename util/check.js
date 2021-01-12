const { httpExpection } = require('./httpExpection')

async function checkError(ctx, next) {
  try {
    await next()
  } catch (error) {
    console.log(error)
    if (error instanceof httpExpection) {
      ctx.body = {
        mag: error.msg,
        errorCode: error.errorCode,
        index: error.index? error.index: 0,
        require: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = error.status
    } else {
      ctx.body = {
        msg: '服务器出错了',
        errorCode: 10000,
        require: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500
    }
  }
}

module.exports = checkError
