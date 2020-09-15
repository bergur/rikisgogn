const express = require('express')

function makeLoginRouter (login) {
  const router = express.Router()

  router.post('/', (req, res, next) => {
    login(req.body.email, req.body.password)
      .then(user => {
        res
          .cookie('RIKISGOGN_TOKEN', user.token)
          .send(user)
      })
      .catch(next)
  })

  return router
}

module.exports = makeLoginRouter
