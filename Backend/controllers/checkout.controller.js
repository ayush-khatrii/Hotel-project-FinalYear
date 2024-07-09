import Booking from "../models/booking.models.js";
import User from "../models/users.model.js";
import { instance } from "../index.js"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

const Checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.totalPrice * 100),  // amount in the smallest currency unit
      currency: "INR",
    };
    const booking = await instance.orders.create(options);

    res.status(200).json({ success: true, booking });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const payment = async (req, res) => {
  try {
    console.log('Payment Verification Data:', req.body);
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingDetails } = req.body;

    // Razorpay verification
    const isVerified = validatePaymentVerification({
      "order_id": razorpayOrderId,
      "payment_id": razorpayPaymentId
    }, razorpaySignature, process.env.RAZORPAY_SECRET_KEY);

    console.log(isVerified);

    if (isVerified) {
      const newBooking = new Booking({
        user: req.user.id,
        room: bookingDetails.roomId,
        imgUrl: bookingDetails.imgUrl,
        checkindate: bookingDetails.checkIn,
        checkoutdate: bookingDetails.checkOut,
        adults: bookingDetails.adults,
        children: bookingDetails.children,
        totalPrice: bookingDetails.totalPrice,
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId,
        signature: razorpaySignature,
      });

      // save booking and also push it to the user bookings using promise.all
      const user = await User.findById(req.user.id);
      user.bookings.push(newBooking._id);
      await Promise.all([
        newBooking.save(),
        user.save(),
      ]);
      res.status(200).json({ success: true, message: "Payment Successfull!" });
    }
    else {
      res.status(500).json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default {
  Checkout,
  payment
};