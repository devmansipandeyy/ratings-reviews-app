const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews_db',
  password: 'Aditya,3',
  port: 5432,
});
module.exports = pool;