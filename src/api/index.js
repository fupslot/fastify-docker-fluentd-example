const fastify_plugin = require('fastify-plugin')

module.exports = fastify_plugin(function(app, opts, done) {
  app.register(require('./token'))
  done()
})