const express = require('express')

function makeAverageSalariesRouter (authorize, select) {
  const router = new express.Router()

  router.get('/', authorize(), (req, res, next) => {
    select(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeAverageSalariesRouter
