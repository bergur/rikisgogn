function corsOptions (req, callback) {
  const options = {
    origin: req.user && req.user.origin
  }

  console.log(options)

  callback(null, options)
}

module.exports = corsOptions
