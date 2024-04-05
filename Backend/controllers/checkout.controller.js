import Stripe from "stripe";
import Booking from "../models/booking.models.js";
import User from "../models/users.model.js";

const handleCheckout = async (req, res) => {
  try {
    const {
      singleRoomDetails,
      totalPrice,
      adults,
      imgUrl,
      children,
      checkInDate,
      checkOutDate,
      email,
    } = req.body;

    const userId = req.user.id;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: singleRoomDetails?.roomType,
              description: "Hello this is desc",
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
    });

    const newBooking = new Booking({
      room: singleRoomDetails._id,
      user: userId,
      checkindate: checkInDate,
      checkoutdate: checkOutDate,
      adults: adults,
      children: children,
      totalPrice: totalPrice,
      imgUrl: imgUrl,
    });

    await newBooking.save();

    // Saving the newly booking  id into the user  model
    const user = await User.findById(userId);
    user.booking.push(newBooking._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment Success Room booked successfully!",
      session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export default {
  handleCheckout,
};
