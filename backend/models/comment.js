const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, minLength: 1, maxLength: 100, required: true },
  content: { type: String, minLength: 1, maxLength: 500, required: true },
  time: { type: Date },
});

module.exports = mongoose.model('Comment', CommentSchema);
