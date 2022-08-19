const { mongooseConfig } = require('../configs');
const mongoose = require('mongoose');

const connect = () => {
  if (!mongoose.connections[0].readyState) {
    console.log('Starting new Mongo DB connection...');
    console.log(mongooseConfig.url);
    return mongoose.connect(mongooseConfig.url, mongooseConfig.options);
  }
};

const disconnect = async () => {
  if (!mongoose.connections[0].readyState) {
    return await mongoose.disconnect();
  }
};

module.exports = { connect, disconnect };
