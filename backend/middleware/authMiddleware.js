const jwtUtils = require('../utils/jwtUtils');
const config = require('../config/config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwtUtils.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    req.admin = decoded.id;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};