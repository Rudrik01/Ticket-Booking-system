const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  generateToken: function(payload) {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
  },
  verifyToken: function(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
};
