const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model('Role', roleSchema);
