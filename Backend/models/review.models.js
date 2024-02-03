import mongoose from 'mongoose'

// Review Schema
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
})

// Exporting Review as model from Room schema
const Review = mongoose.model("Review", reviewSchema);
export default Review;