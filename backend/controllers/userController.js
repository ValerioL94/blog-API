const User = require('../models/user');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.sign_up = [
  body('username')
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage('Username must contain at least 1 character')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error('Username already in use');
      }
    }),
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Enter a valid E-mail')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
  body('password')
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage('Password must contain at least 8 characters'),
  body('passwordConfirm', 'Passwords do not match').custom((value, { req }) => {
    return value === req.body.password;
  }),
  body('authorKey', 'Wrong secret password')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .equals(process.env.AUTHOR_KEY),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
    });
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      newUser.password = hashedPassword;
      await newUser.save();
      res.send({ message: 'Sign-up successful' });
    });
  }),
];

exports.log_in = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const opts = {};
      opts.expiresIn = 300;
      const secret = process.env.SECRET;
      const token = jwt.sign({ email }, secret, opts);
      return res.status(200).json({
        message: 'Auth Passed',
        token,
        expiresIn: opts.expiresIn,
      });
    }
  }
  return res.status(401).json({ message: 'Auth Failed' });
});
