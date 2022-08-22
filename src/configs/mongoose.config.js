require('dotenv').config();

const mongooseConfig = {
  url: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

module.exports = { mongooseConfig };
