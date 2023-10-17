const bcrypt = require('bcrypt');

async function hashPassword(Password) {
  return bcrypt.hash(Password, 10);
}

async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
