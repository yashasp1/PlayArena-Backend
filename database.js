const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Shaliniraju@2001',
  database: 'playarena'
});

module.exports = db;
