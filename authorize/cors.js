function corsOptions (logger) {
  return {
    origin: (origin, callback) => {
      logger.info('cors', { origin })
      callback(null, origin)
    },
    credentials: true
  }
}

module.exports = corsOptions
