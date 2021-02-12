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

// const db_url = 'pg://adam:test@localhost:5432/photo_gallery';
// const pool = new Pool({ connectionString: db_url });
pool.on('connect', () => {
  console.log('connected to the db');
});

pool.connect();

module.exports = {
  pool,
  query: (text, params, cb) => pool.query(text, params, cb),
};
