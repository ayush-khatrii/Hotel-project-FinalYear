import express from "express";
import bookingController from "../controllers/bookings.controller.js";
import {
  verifyAdmin,
  verifyUser,
  verifyUserOrAdmin,
} from "../middlewares/verifyToken.js";

// Express Router
const router = express.Router();

// Booking routes
router.get("/", verifyAdmin, bookingController.handleGetAllBookings);
router.get("/:id", verifyUser, bookingController.handleGetBookingById);

router.delete(
  "/:id",
  verifyUserOrAdmin,
  bookingController.handleDeleteBookingById
);

export default router;
