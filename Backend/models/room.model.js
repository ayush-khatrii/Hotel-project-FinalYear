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
export default Room;