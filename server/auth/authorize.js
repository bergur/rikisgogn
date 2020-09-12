const getToken = require('./getToken')

function makeAuthorize (redisClient, logger) {
  return function authorize () {
    return (req, res, next) => {
      console.log(req.headers.authorization)
      const token = getToken(req.headers.authorization)

      if (token) {
        redisClient.get(token, (err, reply) => {
          if (err) {
            logger.error('Error authorizing')
            logger.error(err)
            return res.sendStatus(401)
          }

          if (!reply) {
            return res.sendStatus(401)
          }

          req.user = JSON.parse(reply)
          return next()
        })
      } else {
        return res.sendStatus(401)
      }
    }
  }
}

module.exports = makeAuthorize