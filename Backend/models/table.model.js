import mongoose from "mongoose";

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


const Room = mongoose.model("Table", tableSchemas);

export default Room;