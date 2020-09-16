function makeComposition (pgPool, redisClient, logger) {
  // Auth
  const makeAuthorize = require('../authorize/authorize')
  const onlyAdmin = require('../authorize/onlyAdmin')
  const authorize = makeAuthorize(redisClient, logger)

  // Users
  const makeSelectUsers = require('../repo/users/select')
  const makeUsersRoute = require('../routes/users')
  const selectUsers = makeSelectUsers(pgPool)
  const usersRouter = makeUsersRoute(authorize, onlyAdmin, selectUsers)

  // User
  const makeUserRoute = require('../routes/user')
  const userRouter = makeUserRoute(authorize)

  // Login
  const makeLogin = require('../authorize/login')
  const makeLoginRouter = require('../routes/login.js')
  const login = makeLogin(selectUsers, redisClient)
  const loginRouter = makeLoginRouter(login)

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
    '/login': loginRouter,
    '/user': userRouter,
    '/users': usersRouter,
    '/unions': unionsRouter,
    '/averagesalaries': averageSalariesyRouter
  }
}

module.exports = makeComposition
