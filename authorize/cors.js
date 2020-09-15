function corsOptions () {
  return {
    origin: (origin, callback) => {
      callback(null, origin)
    },
    credentials: true
  }
}

module.exports = corsOptions
