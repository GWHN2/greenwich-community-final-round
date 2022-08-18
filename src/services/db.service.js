const { mongooseConfig } = require('../configs');
const mongoose = require('mongoose');

const connect = () => {
  console.log('Starting new Mongo DB connection...');
  console.log(mongooseConfig.url);
  return mongoose.connect(mongooseConfig.url, mongooseConfig.options);
};

const disconnect = async () => {
  return await mongoose.disconnect();
};

module.exports = { connect, disconnect };
