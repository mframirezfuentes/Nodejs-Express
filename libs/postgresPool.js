const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.HOST,
  por: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


module.exports = pool;

