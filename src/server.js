require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error_handler.middleware');
const dbService = require('./services/db.service');
const { mainRouter } = require('./routes/index');
const bodyParser = require('body-parser');
const { createRolesIfNotExist } = require('./services/role.service');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

dbService
  .connect()
  .then(() => {
    console.log('connected to the database');
    init();
  })
  .catch((err) => {
    console.log('error connecting to the database', err);
  });

const init = async () => {
  await createRolesIfNotExist(['Admin', 'Student', 'Employer']);

  app.use(mainRouter);
  app.use(notFound);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};
