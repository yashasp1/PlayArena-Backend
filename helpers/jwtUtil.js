const jwt = require('jsonwebtoken');
const JWT_SECRET='play';

function generateToken(payload) {
  return jwt.sign(payload,JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};
