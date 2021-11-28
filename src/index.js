const { fastify } = require('fastify');

const { createContext } = require('./internal/context')

const app = fastify({
  logger: false
})

app.register(require('./api'), { prefix: '/api' })

app.decorate('ctx', createContext() )

app.listen(+process.env.PORT, '0.0.0.0', function(err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  app.log.info(`Listening on port ${+process.env.PORT}`)
})
