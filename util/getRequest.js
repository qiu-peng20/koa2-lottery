async function getRequest(ctx, next) {
  const req = ctx.query
  const body = ctx.request.body
  ctx.v = { ...req, ...body }
  await next()
}

module.exports = getRequest
