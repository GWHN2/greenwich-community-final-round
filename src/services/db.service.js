const mongooseConfig = require('../configs/mongoose.config');
const mongoose = require('mongoose');

const connect = () => {
  if (!mongoose.connections[0].readyState) {
    console.log('Starting new Mongo DB connection...');
    return mongoose.connect(mongooseConfig.url, mongooseConfig.options);
  }
};

const disconnect = async () => {
  if (!mongoose.connections[0].readyState) {
    return await mongoose.disconnect();
  }
};

module.exports = { connect, disconnect };
