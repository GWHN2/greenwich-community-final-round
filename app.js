const express = require('express')
const app = express();
const courses = require('./routes/course');
const events = require('./routes/event');
const users = require('./routes/user');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
app.use(express.json());
app.get('/hello', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/v1/users', users);
app.use('/api/v1/events', events);
app.use('/api/v1/courses', courses);
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on ${port}`))
    }catch(error){
        console.log(error);
    }
}

start()