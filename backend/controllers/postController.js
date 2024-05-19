const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ time: 1 }).populate('author').exec();
  res.json({ posts });
});
exports.create = [
  body('title', 'Title should contain at least 1 character')
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
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      author: req.user.id,
    });
    if (!errors.isEmpty()) {
      return res.send({ post, errors: errors.array() });
    }
    await post.save();
    res.json({ post });
  }),
];
exports.read = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();
  if (post === null) {
    return res.status(404).send({ error: 'Post not Found' });
  }
  res.json({ post });
});
exports.update = [
  body('title', 'Title should contain at least 1 character')
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
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.content,
      author: req.user.id,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      return res.send({ post, errors: errors.array() });
    }
    await Post.findByIdAndUpdate(req.params.id, post, {});
    res.send('Post updated successfully.');
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id).exec();
  res.send('Post deleted successfully.');
});
