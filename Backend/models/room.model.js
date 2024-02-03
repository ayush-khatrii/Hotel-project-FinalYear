import mongoose from 'mongoose'

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
    ammenities: [
        {
            type: String
        }
    ],
    roomName: {
        type: String,
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
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isBooked: {
        type: Boolean,
        required: false
    }
})

// Exporting Room as model from Room schema
const Room = mongoose.model("Room", roomSchema);
export default Room;