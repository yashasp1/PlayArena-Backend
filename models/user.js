const db = require('../database');

async function createUser({ FirstName, LastName, Email, Password }) {
  const [result] = await db.query(
    'INSERT INTO users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)',
    [FirstName, LastName, Email, Password]
  );
  return result;
}

async function getUserByEmail(Email) {
    const [rows] = await db.query('SELECT * FROM users WHERE Email = ?', [Email]);
    return rows;
  }

module.exports = {
  createUser,
  getUserByEmail
};
