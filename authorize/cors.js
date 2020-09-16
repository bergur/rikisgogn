function corsOptions (logger) {
  return {
    origin: (origin, callback) => {
      console.log('cors', { origin })
      callback(null, origin)
    },
    credentials: true
  }
}

module.exports = corsOptions
