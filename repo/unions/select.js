
const { toOrdinal } = require('pg-parameterize')

function makeSelectUsers (db) {
  return function selectUsers (options) {
    const opt = options || {}
    const params = []
    let sql = `
      SELECT
        u.id,
        u.fullname,
        u.shortname,
        u.abbreviation
      FROM
        unions u
      WHERE
        1=1`

    if (opt.id) {
      sql += ' AND id = ?'
      params.push(opt.username)
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectUsers
