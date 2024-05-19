const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 100, required: true },
  content: { type: String, minLength: 1, maxLength: 2000, required: true },
  time: { type: Date },
  published: { type: Boolean, default: false },
  author: { type: Schema.Types.objectId, ref: 'User' },
});

module.exports = mongoose.model('Post', PostSchema);
