const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const mongoDB = process.env.MONGODB_URI;
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');
const jwtStrategy = require('./strategies/jwt');

const app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.options('*', cors());

passport.use(jwtStrategy);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
