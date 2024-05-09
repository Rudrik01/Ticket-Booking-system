const { body, validationResult } = require('express-validator');

module.exports = {
  validateRequest: function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userValidationRules: function() {
    return [
      body('email').isEmail(),
      body('password').isLength({ min: 6 })
    ];
  },
  eventValidationRules: function() {
    return [
      body('title').notEmpty(),
      body('date').isISO8601(),
      body('description').optional().isString(),
      body('seatsAvailable').isInt({ min: 1 })
    ];
  }
};
