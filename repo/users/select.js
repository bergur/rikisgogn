
const { toOrdinal } = require('pg-parameterize')

function makeSelectUsers (db) {
  return function selectUsers (options) {
    const opt = options || {}
    const params = []
    let sql = `
      SELECT
        u.id,
        u.email,
        u.password,
        u.fullname,
        u.origin,
        admin,
        accesstoken
      FROM
        users u
      WHERE
        1=1`

    if (opt.email) {
      sql += ' AND email = ?'
      params.push(opt.email)
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectUsers
