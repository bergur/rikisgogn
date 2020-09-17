function corsOrigin () {
  return function (origin, cb) {
    console.log(origin)
    cb(null, true)
  }
}

module.exports = corsOrigin
