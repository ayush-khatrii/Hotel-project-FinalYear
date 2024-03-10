import Booking from "../models/booking.models.js";

// Get all bookings for the current user
const handleGetAllBookings = async (req, res) => {
  try {
    const userBookings = await Booking.find();
    res.status(200).json(userBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by id for the current user
const handleGetBookingById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found for this user" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete booking by id
const handleDeleteBookingById = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findOneAndDelete({
      _id: bookingId,
      user: req.user.id,
    });
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found for this user" });
    }
    res
      .status(200)
      .json({ message: "Booking deleted successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  handleGetAllBookings,
  handleGetBookingById,
  handleDeleteBookingById,
};
