const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');
const user_controller = require('../controllers/userController');

router.get('/', post_controller.index);

router.post('/posts', post_controller.create);
router.get('/posts/:postid', post_controller.read);
router.put('/posts/:postid', post_controller.update);
router.delete('/posts/:postid', post_controller.delete);

/*
router.post('/comments', comment_controller.create);
router.get('/comments', post_controller.read);
router.put('/comments/:commentid', comment_controller.update);
router.delete('/comments/:commentid', comment_controller.delete);

router.get('/users/sign-up', user_controller.sign_up_get);
router.post('/users/sign-up', user_controller.sign_up_post);
router.get('/users/log-in', user_controller.log_in_get);
router.post('/users/log-in', user_controller.log_in_post);
router.get('/users/log-out', user_controller.log_out_get);
*/

module.exports = router;
