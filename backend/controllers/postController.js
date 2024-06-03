const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate('author', '-password')
    .sort({ createdAt: -1 })
    .exec();
  res.json(posts);
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
  body('published').toBoolean(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      author: req.body.author,
    });
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    await post.save();
    res.json(post);
  }),
];
exports.read = asyncHandler(async (req, res, next) => {
  const [post, commentsInPost] = await Promise.all([
    Post.findById(req.params.postid).populate('author', '-password').exec(),
    Comment.find({ post: req.params.postid }).exec(),
  ]);
  if (!post) {
    return res.status(404).send({ error: 'Post not Found' });
  }
  res.json({ post, commentsInPost });
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
  body('published').toBoolean(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      author: req.body.author,
      _id: req.params.postid,
    });
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    await Post.findByIdAndUpdate(req.params.postid, post, {});
    res.json({ message: `Post ${post._id} updated successfully` });
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  await Promise.all([
    Comment.deleteMany({ post: req.body.id }).exec(),
    Post.findByIdAndDelete(req.body.id).exec(),
  ]);
  res.json({ message: `Post ${req.body.id} deleted successfully` });
});
