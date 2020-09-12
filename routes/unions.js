const express = require('express')

function makeUnionsRouter (select) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    select(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeUnionsRouter
