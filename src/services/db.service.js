const mongoose = require('mongoose');
const { configs } = require('../configs');

const connect = () => {
  if (!mongoose.connections[0].readyState) {
    console.log('Starting new Mongo DB connection...');
    return mongoose.connect(configs.mongoose.url, configs.mongoose.options);
  }
};

const disconnect = async () => {
  if (!mongoose.connections[0].readyState) {
    return await mongoose.disconnect();
  }
};

module.exports = { connect, disconnect };
