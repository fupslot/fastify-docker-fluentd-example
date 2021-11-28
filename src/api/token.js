const fastify_plugin = require('fastify-plugin')
const util = require('util')

const sleep = util.promisify(setTimeout)

module.exports = fastify_plugin(function(app, opts, done) {
  
  app.post('/token', async function(req) {
    await sleep(200)
    
    const tenantId = req.body.tenantId;

    let token = null
    if (!app.ctx.hasToken(tenantId)) {
      token = app.ctx.createToken(tenantId)
    } else {
      token = app.ctx.getToken(tenantId)
    }
    
    return {
      token
    }
  })
  
  done()
})