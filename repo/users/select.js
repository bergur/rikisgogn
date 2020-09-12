
const { toOrdinal } = require('pg-parameterize')

function makeSelectUsers (db) {
  return function selectUsers (options) {
    const opt = options || {}
    const params = []
    let sql = `
      SELECT
        u.id,
        u.username,
        u.password,
        u.fullname,
        u.origin,
        u.admin
      FROM
        users u
      WHERE
        1=1`

    if (opt.username) {
      sql += ' AND username = ?'
      params.push(opt.username)
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectUsers
