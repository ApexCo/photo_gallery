const { Pool } = require('pg');

const pool = new Pool({
  user: 'adam',
  password: 'test',
  database: 'photo_gallery',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect();

module.exports = {
  pool,
  query: (text, params, cb) => pool.query(text, params, cb),
};
