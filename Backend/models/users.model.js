// importing mongoose for creating MongoDB user schema and model.
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookings",

        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Exporting user as model from user schema
const User = mongoose.model('User', userSchema);
module.exports = User;