const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, minLength: 1, maxLength: 100, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, minLength: 8, required: true },
});

module.exports = mongoose.model('User', UserSchema);
