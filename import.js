require('dotenv').config()

const pg = require('pg')
const makeInsertAverageSalaries = require('./repo/averagesalaries/insert')
const readFileSync = require('fs').readFileSync

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const file = readFileSync('./hjukrunarfraedingar.csv')

const data = file.toString().split('\n').slice()

const arr = data.map(line => {
  const columns = line.split(';')
  return [
    1,
    columns[0], // period
    columns[1], // employment,
    columns[2], // daytime
    columns[3], // overtime
    columns[4], // shift
    columns[5], // other
    columns[6], // total
    columns[7] // genderid
  ]
})

if (arr[arr.length - 1][2] === undefined) {
  arr.pop()
}

console.log(arr)
const insertAverageSalaries = makeInsertAverageSalaries(pgPool)

insertAverageSalaries(arr).then(res => {
  console.log(res)
})
