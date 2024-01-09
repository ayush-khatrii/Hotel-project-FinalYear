// importing mongoose for creating MongoDB user schema and model.
const mongoose = require('mongoose');

// Room Schema
const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    ammenities: [
        {
            type: String
        }
    ],
    roomname: {
        type: String,
        required: true
    },
    roomImages: [ //string from cloudinary URL 
        {
            type: String,
            required: true,
        }
    ],

    numberofbeds: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        required: true
    }
})

// Exporting Room as model from Room schema
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;