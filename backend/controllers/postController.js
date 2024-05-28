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
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      author: req.body.authorId,
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
    Post.findById(req.params.postId).populate('author', '-password').exec(),
    Comment.find({ post: req.params.postId }).exec(),
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
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.content,
      author: req.body.authorId,
      _id: req.params.postId,
    });
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    await Post.findByIdAndUpdate(req.params.postId, post, {});
    res.send({ message: `Post ${post._id} updated successfully` });
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.postId).exec();
  res.send({ message: 'Post deleted successfully.' });
});
