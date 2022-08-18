require('dotenv').config();

const express = require('express');
const app = express();
const courses = require('./routes/course');
const events = require('./routes/event');
const users = require('./routes/user');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const dbService = require('./services/db.service');

app.use(express.json());

// dbService
//   .connect()
//   .then(() => {
//     console.log('connected to the database');
//   })
//   .catch((err) => {
//     console.log('error connecting to the database', err);
//   });

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/users', users);
app.use('/api/v1/events', events);
app.use('/api/v1/courses', courses);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
