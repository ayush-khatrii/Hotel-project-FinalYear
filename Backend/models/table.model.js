// importing mongoose for creating MongoDB user schema and model.
const mongoose = require('mongoose');

// Room Schema
const tableSchemas = new mongoose.Schema({

    tableNumber: {
        type: Number,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        required: true
    },

})

// Exporting Room as model from Room schema
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;