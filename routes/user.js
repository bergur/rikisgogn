const express = require('express')

function makeUserRouter (authorize) {
  const router = express.Router()

  router.get('/', authorize(), (req, res) => {
    res.json(req.user)
  })

  return router
}

module.exports = makeUserRouter
