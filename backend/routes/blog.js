const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');
const user_controller = require('../controllers/userController');
const passport = require('passport');

router.get('/', (req, res) => res.send('home'));
router.get('/posts', post_controller.index);
router.post(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  post_controller.create
);
router.get('/posts/:postId', post_controller.read);
router.put(
  '/posts/:postId',
  passport.authenticate('jwt', { session: false }),
  post_controller.update
);
router.delete(
  '/posts/:postId',
  passport.authenticate('jwt', { session: false }),
  post_controller.delete
);

router.post('/posts/:postId/comments', comment_controller.create);
router.put(
  '/posts/:postId/comments/:commentid',
  passport.authenticate('jwt', { session: false }),
  comment_controller.update
);
router.delete(
  '/posts/:postId/comments/:commentid',
  passport.authenticate('jwt', { session: false }),
  comment_controller.delete
);

router.post('/users/sign-up', user_controller.sign_up);
router.post('/users/log-in', user_controller.log_in);
// router.post('/users/log-out', user_controller.log_out);

module.exports = router;
