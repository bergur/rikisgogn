const express = require('express')

function makeUsersRouter (authorize, onlyAdmin, select) {
  const router = express.Router()

  router.get('/', authorize(), onlyAdmin(), (req, res, next) => {
    select(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeUsersRouter
