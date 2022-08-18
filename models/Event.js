const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    tokens:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)