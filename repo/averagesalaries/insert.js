
const { flatten, toTuple } = require('pg-parameterize')

function makeInsertAverageSalaries (db) {
  return function insertAverageSalaries (arr) {
    const sql = `
      INSERT INTO averagesalaries (        
        unionid,
        period,
        employment,
        daytime,
        overtime,
        shiftwork,
        other,
        total,
        genderid        
      ) VALUES ` + toTuple(arr, true)

    const params = flatten(arr)

    return db
      .query(sql, params)
      .then(res => res.rowCount)
  }
}

module.exports = makeInsertAverageSalaries
