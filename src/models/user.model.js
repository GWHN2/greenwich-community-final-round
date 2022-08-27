const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  principalID: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
  code: {
    type: String,
    required: false,
  },
  tokens: {
    type: Number,
    required: true,
  },
  access_token: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema);
