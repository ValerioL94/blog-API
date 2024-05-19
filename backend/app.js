const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');

const User = require('./models/user');
const Post = require('./models/post');
const mongoDB = process.env.MONGODB_URI;
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');

const app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors());
// app.use(passport.session());

// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email' },
//     async (username, password, done) => {
//       try {
//         const user = await User.findOne({ email: username });
//         if (!user) {
//           return done(null, false, { message: 'Incorrect E-mail' });
//         }
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//           // passwords do not match!
//           return done(null, false, { message: 'Incorrect password' });
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

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

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
