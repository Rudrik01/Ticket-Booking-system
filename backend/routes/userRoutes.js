// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const rateLimiter = require('../middleware/rateLimitMiddleware');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
router.post('/signup', userController.signup);
router.post('/login', rateLimiter, userController.login);
router.post('/forgot-password', rateLimiter, userController.forgotPassword);

router.post('/google-login', async (req, res) => {
    const { token } = req.body;
  
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        // If user does not exist, create a new user
        user = new User({
          email,
          role: 'client', // Assign default role to new user
        });
        await user.save();
      }
  
      // Generate JWT token for the user
      const jwtPayload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
  
      jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role });
      });
    } catch (error) {
      console.error('Google login failed:', error);
      res.status(500).json({ msg: 'Google login failed' });
    }
  });

  router.post('/google-signup', async (req, res) => {
    const { token } = req.body;
  
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        // If user does not exist, create a new user
        user = new User({
          email,
          role: 'client', // Assign default role to new user
        });
        await user.save();
      }
  
      // Generate JWT token for the user
      const jwtPayload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
  
      jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role });
      });
    } catch (error) {
      console.error('Google signup failed:', error);
      res.status(500).json({ msg: 'Google signup failed' });
    }
  });
  
  module.exports = router;
