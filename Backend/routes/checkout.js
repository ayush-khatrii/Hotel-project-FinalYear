import express from "express";
import checkoutController from "../controllers/checkout.controller.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();
// POST REQ. FOR PAYMENTS

router.post("/", verifyUser, checkoutController.Checkout);
router.post("/paymentVerification", verifyUser, checkoutController.payment);

export default router;
