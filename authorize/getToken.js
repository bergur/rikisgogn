function getToken (authorizationHeader) {
  let token
  if (authorizationHeader) {
    const parts = authorizationHeader.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }

  return token
}

module.exports = getToken
