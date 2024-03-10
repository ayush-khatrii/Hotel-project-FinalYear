import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", verifyUser, getUser);
export default router;
