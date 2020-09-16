function onlyAdmin () {
  return (req, res, next) => {
    if (req.user && req.user.admin) {
      return next()
    } else {
      return res.sendStatus(401)
    }
  }
}

module.exports = onlyAdmin
