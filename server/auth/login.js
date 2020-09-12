const compare = require('bcryptjs').compare
const uid = require('uid-safe')

function makeLogin (selectUsers, redisClient) {
  return function login (username, password) {
    return selectUsers({ username })
      .then(users => {
        const user = users.length === 1 ? users[0] : undefined

        if (!user) {
          return undefined
        }

        return compare(password, user.password).then(success => {
          if (!success) {
            return undefined
          } else {
            return uid(18).then(token => {
              user.password = undefined
              redisClient.set(token, JSON.stringify(user))
              return { user, token }
            })
          }
        })
      })
  }
}

module.exports = makeLogin
