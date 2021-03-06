
const { toOrdinal } = require('pg-parameterize')

function makeSelectUnions (db) {
  return function selectUnions (options) {
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
      params.push(opt.id)
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectUnions
