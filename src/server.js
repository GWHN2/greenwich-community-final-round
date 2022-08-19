require('dotenv').config();

const express = require('express');
const app = express();
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error_handler.middleware.js');
const dbService = require('./services/db.service');
const { mainRouter } = require('./routes/index');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

dbService
  .connect()
  .then(() => {
    console.log('connected to the database');
  })
  .catch((err) => {
    console.log('error connecting to the database', err);
  });

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});
app.use(mainRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
