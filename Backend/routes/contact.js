import express from "express";
import contactController from "../controllers/contact.controller.js";

// express router
const router = express.Router();

// contact routes
router.get("/", contactController.handleGetAllContact);
router.post("/", contactController.handlePostContact);

export default router;
