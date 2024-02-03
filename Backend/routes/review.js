import express from 'express'
import reviewController from '../controllers/review.controller.js';
import { verifyUser, verifyUserOrAdmin } from '../middlewares/verifyToken.js';

// Express Router 
const router = express.Router();

// Room routes
router.get("/", reviewController.handleGetAllReviews);
router.get("/:id", reviewController.handleGetReviewById);

router.put("/:id", verifyUser, reviewController.handleUpdateReviewsById);
router.post('/:roomId', verifyUser, reviewController.handlePostReviews);

router.delete("/:id", verifyUser, reviewController.handleDeleteReviewsById);
router.delete("/:id", verifyUserOrAdmin, reviewController.handleDeleteReviewsById);

export default router;