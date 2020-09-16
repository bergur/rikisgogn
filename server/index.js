require('dotenv').config()

const pg = require('pg')
const redis = require('redis')
const logger = require('heroku-logger')
const corsOptions = require('../authorize/cors')
const createService = require('./service')
const makeComposition = require('./composition')

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})

const routes = makeComposition(pgPool, redisClient, logger)

const port = process.env.PORT || 3001
createService(corsOptions, routes, logger).listen(port, () => {
  logger.info('Server starting', { port })
})
