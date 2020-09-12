function corsOptions (req, callback) {
  const options = {
    origin: req.user && req.user.origin
  }

  callback(null, options)
}

module.exports = corsOptions
