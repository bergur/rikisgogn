const { compare } = require('bcryptjs')
function makeLogin (selectUsers, redisClient) {
  return function login (email, password) {
    return selectUsers({ email })
      .then(users => {
        const user = users.length === 1 ? users[0] : undefined

        if (!user) {
          return undefined // sholdn't i throw an error?
        }

        return compare(password, user.password).then(success => {
          if (!success) {
            return undefined
          } else {
            const token = user.accesstoken
            delete user.password
            delete user.accesstoken
            redisClient.set(token, JSON.stringify(user))
            return { user, token }
          }
        })
      })
  }
}

module.exports = makeLogin
