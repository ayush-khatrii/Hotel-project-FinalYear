import express from "express";
import checkoutController from "../controllers/checkout.controller.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();
// POST REQ. FOR PAYMENTS

router.post(
  "/create-checkout-session",
  verifyUser,
  checkoutController.handleCheckout
);

export default router;
