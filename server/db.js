const { Pool } = require('pg')
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
})

// let client;
const initalizeDB = async() => {
  const client = await pool.connect()
  await client.query('CREATE SCHEMA IF NOT EXISTS "monopoly_bank";');

  await client.query(`
    CREATE TABLE IF NOT EXISTS customer (
      customer_id SERIAL NOT NULL PRIMARY KEY,
      group_name VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      checking_amount INT,
      savings_amount INT
    );
  `)

  await client.query(`
    CREATE TABLE IF NOT EXISTS checking_history (
      checking_history_id SERIAL NOT NULL PRIMARY KEY,
      customer_id INT NOT NULL,
      deposit BOOLEAN NOT NULL,
      money_from VARCHAR(255) NOT NULL,
      transaction_amount INT NOT NULL,
      transaction_date TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
    );
  `);
  client?.release()
}
initalizeDB()

module.exports.pool = pool