import Review from '../models/review.models.js';
import Room from '../models/room.model.js';

// Get All Reviews
const handleGetAllReviews = async (req, res, next) => {
    try {
        const allReviews = await Review.find().populate({
            path: 'user',
            select: 'username', // Select only the username field
        }).populate('room'); // Populate the room field
        res.status(200).json(allReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Reviews by ID
const handleGetReviewById = async (req, res, next) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ error: "Review not found!" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create Reviews
const handlePostReviews = async (req, res, next) => {
    try {
        const { comment, rating } = req.body;
        const { roomId } = req.params;
        const userId = req.user.id;


        // Check if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found!" });
        }

        const newReview = new Review({
            rating,
            comment,
            user: userId,
            room: roomId
        });

        await newReview.save();

        room.reviews.push(newReview._id);
        await room.save();

        res.status(200).json({ message: "Review Successfully Created!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// const handlePostReviews = async (req, res, next) => {

//     try {
//         const { comment, rating } = req.body;
//         const { roomId } = req.params;
//         const userId = req.user._id;


//         // Check if the room exists
//         const room = await Room.findById(roomId);
//         if (!room) {
//             return res.status(404).json({ error: "Room not found!" });
//         }


//         // Create the review
//         const newReview = new Review({
//             user: userId,
//             room: roomId,
//             comment,
//             rating
//         });

//         // Save the review
//         await newReview.save();

//         // Associate the review with the room
//         room.reviews.push(newReview._id);
//         await room.save();

//         res.status(201).json({ message: "Review posted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// Update Review by ID
const handleUpdateReviewsById = async (req, res, next) => {
    const reviewId = req.params.id;
    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found!" });
        }
        return res.status(200).json({ message: "Review Updated Successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete Review by ID
const handleDeleteReviewsById = async (req, res, next) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json({ message: "Review Deleted Successfully!", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    handleGetAllReviews,
    handleGetReviewById,
    handlePostReviews,
    handleUpdateReviewsById,
    handleDeleteReviewsById
}