require('dotenv').config()

const pg = require('pg')
const redis = require('redis')
const logger = require('heroku-logger')
const corsOptions = require('./auth/cors')
const createService = require('./service')
const makeSelectUnions = require('../repo/unions/select')
const makeUnionsRouter = require('../routes/unions')
const makeSelectAverageSalaries = require('../repo/averagesalaries/select')
const makeAverageSalariesRouter = require('../routes/averagesalaries')
const makeAuthorize = require('./auth/authorize')

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})

const authorize = makeAuthorize(redisClient, logger)
const selectUnions = makeSelectUnions(pgPool)
const unionsRouter = makeUnionsRouter(selectUnions)

const selectAverageSalaries = makeSelectAverageSalaries(pgPool)
const averageSalariesyRouter = makeAverageSalariesRouter(authorize, selectAverageSalaries)

const routes = {
  '/unions': unionsRouter,
  '/averagesalaries': averageSalariesyRouter
}

const port = process.env.PORT || 3001
createService(authorize, corsOptions, routes).listen(port, () => {
  logger.info('Server starting', { port })
})
