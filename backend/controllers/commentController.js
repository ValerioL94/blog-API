const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.create = [
  body('username', 'Username should contain at least 1 character')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .unescape('&#x27;'),
  body('content', 'Content should contain at least 1 character ')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .unescape('&#x27;'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment({
      username: req.body.username,
      content: req.body.content,
      post: req.params.postid,
    });
    if (!errors.isEmpty()) {
      return res.send({ comment, errors: errors.array() });
    }
    await comment.save();
    res.json(comment);
  }),
];

exports.update = [
  body('username', 'Username should contain at least 1 character')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .unescape('&#x27;'),
  body('content', 'Content should contain at least 1 character ')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .unescape('&#x27;'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment({
      username: req.body.username,
      content: req.body.content,
      post: req.params.postid,
      _id: req.params.commentid,
    });
    if (!errors.isEmpty()) {
      return res.send({ comment, errors: errors.array() });
    }
    await Comment.findByIdAndUpdate(req.params.commentid, comment, {});
    res.send({ message: `Comment ${comment._id} updated successfully` });
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.commentid).exec();
  res.send({ message: 'Comment deleted successfully.' });
});
