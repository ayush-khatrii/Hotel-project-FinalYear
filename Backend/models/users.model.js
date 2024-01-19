import mongoose from "mongoose";

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
}, { timestamps: true })

// Exporting user as model from user schema
const User = mongoose.model('User', userSchema);

export default User;