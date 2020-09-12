
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const enforceHttps = require('express-sslify').HTTPS

function createService (authorize, corsOptions, routes) {
  const app = express()

  app.use(bodyParser.json({ limit: '40mb' }))
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

  if (process.env.NODE_ENV === 'production') {
    app.use(enforceHttps({
      trustProtoHeader: true
    }))
    app.use(compression())
    app.use(helmet())
  }

  app.use(cors(corsOptions))

  Object.entries(routes).forEach(([path, router]) => {
    app.use(path, router)
  })

  return app
}

module.exports = createService
