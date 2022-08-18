const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tokens: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Course', courseSchema);
