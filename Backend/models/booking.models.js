import mongoose from "mongoose";

// Bookinngs Schema
const bookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkindate: {
        type: Date,
        required: true
    },
    checkoutdate: {
        type: Date,
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    childern: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    tableBookingDetails: {
        tableId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table',
        },
        numberOfPeople: {
            type: Number,
            required: true,
        },
        // Other table booking-specific details
    },
})


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;