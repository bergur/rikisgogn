
const { toOrdinal } = require('pg-parameterize')

function makeSelectAverageSalaries (db) {
  return function selectAverageSalaries (options) {
    const opt = options || {}
    const params = []
    let sql = `
      SELECT
        id,
        unionid,
        employment,
        daytime,
        overtime,
        shiftwork,
        other,
        total,
        genderid,
        period
      FROM
        averagesalaries
      WHERE
        1=1`

    if (opt.unionid) {
      sql += ' AND unionid = ANY(?)'
      params.push(opt.unionid)
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows)
  }
}

module.exports = makeSelectAverageSalaries
