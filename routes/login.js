const express = require('express')

function makeLoginRouter (login) {
  const router = express.Router()

  router.post('/', (req, res, next) => {
    console.log(req.body)
    login(req.body.email, req.body.password)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeLoginRouter
