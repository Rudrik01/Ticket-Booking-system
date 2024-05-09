// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('../config/config');

// Signup
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role // Include the user's role in the payload
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role }); // Return the authentication token and user's role
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Forgot Password
// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      // Generate random token for password reset
      const token = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });
  
      // Send email with password reset link
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset',
        html: `
          <p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
          <p>Please click on the following link to reset your password:</p>
          <p><a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a></p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ msg: 'Email could not be sent' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ msg: 'Email sent for password reset' });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  // passport.use(new GoogleStrategy({
  //   clientID: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   callbackURL: '/auth/google/callback'
  // },
  // async (accessToken, refreshToken, profile, done) => {
  //   try {
  //     let user = await User.findOne({ email: profile.emails[0].value });
  
  //     if (user) {
  //       return done(null, user);
  //     } else {
  //       user = new User({
  //         email: profile.emails[0].value
  //       });
  //       await user.save();
  //       return done(null, user);
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //     return done(err, null);
  //   }
  // }));
  
  // // Google Sign-In
  // exports.googleSignIn = passport.authenticate('google', { scope: ['profile', 'email'] });
  
  // // Google Sign-In Callback
  // exports.googleSignInCallback = passport.authenticate('google', { failureRedirect: '/login' }),
  // (req, res) => {
  //   // Successful authentication, redirect home.
  //   res.redirect('/');
  // };