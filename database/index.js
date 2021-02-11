const { Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'adam',
//   database: 'photo_gallery',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

const db_url = 'postgres://adam:test@localhost:5432/photo_gallery';
const pool = new Pool({ connectionString: db_url });

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
