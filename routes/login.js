const express = require('express')

function makeLoginRouter (login) {
  const router = express.Router()

  router.post('/', (req, res, next) => {
    const cookieOptions = {
      domain: '.rikisgogn.is',
      secure: process.env.NODE_Env === 'production',
      httpOnly: true,
      sameSite: true,
      path: '/'
    }

    login(req.body.email, req.body.password)
      .then(user => {
        res
          .cookie('RIKISGOGN_TOKEN', user.token, cookieOptions)
          .send(user)
      })
      .catch(next)
  })

  return router
}

module.exports = makeLoginRouter
