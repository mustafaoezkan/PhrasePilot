const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

// PUT /signup - Route to handle user signup
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }), // Validation for password
    body('name').trim().not().isEmpty() // Validation for name
  ],
  authController.signup
);

// POST /login - Route to handle user login
router.post('/login', authController.login);

module.exports = router;
