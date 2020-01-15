const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kelembapan',
  password: 'Inipassword999',
  port: 5432,
})

const getData = (request, response) => {
  pool.query('SELECT * FROM humidity ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDataById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM humidity WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createData = (request, response) => {
  const { humidity, status } = request.body

  pool.query('INSERT INTO humidity (humidity, status) VALUES ($1, $2)', 
    [humidity, status], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(``)
  })
}
module.exports = {
  getData,
  getDataById,
  createData,
}
