function makeComposition (pgPool, redisClient, logger) {
  // Auth
  const makeAuthorize = require('../authorize/authorize')
  const authorize = makeAuthorize(redisClient, logger)

  // Unions
  const makeSelectUnions = require('../repo/unions/select')
  const makeUnionsRouter = require('../routes/unions')
  const selectUnions = makeSelectUnions(pgPool)
  const unionsRouter = makeUnionsRouter(selectUnions)

  // AverageSalaries
  const makeSelectAverageSalaries = require('../repo/averagesalaries/select')
  const makeAverageSalariesRouter = require('../routes/averagesalaries')
  const selectAverageSalaries = makeSelectAverageSalaries(pgPool)
  const averageSalariesyRouter = makeAverageSalariesRouter(authorize, selectAverageSalaries)

  return {
    '/unions': unionsRouter,
    '/averagesalaries': averageSalariesyRouter
  }
}

module.exports = makeComposition
