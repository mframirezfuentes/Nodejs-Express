const { Client } = require('pg')
require('dotenv').config()

async function getConnection() {
  const client = new Client({
    host: process.env.HOST,
    por: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  await client.connect();
  return client;
}

module.exports = getConnection;

