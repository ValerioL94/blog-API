const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, minLength: 1, maxLength: 100, required: true },
    content: { type: String, minLength: 1, required: true },
    published: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);
PostSchema.virtual('url').get(function () {
  return `/blog/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
