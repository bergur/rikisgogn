const express = require('express')

function makeAverageSalariesRouter (select) {
  const router = new express.Router()

  router.get('/', (req, res, next) => {
    select(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeAverageSalariesRouter
