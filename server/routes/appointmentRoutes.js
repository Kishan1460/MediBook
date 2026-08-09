import express from "express";
import { createAppointment, getMyAppointments } from "../controllers/appointmentController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.single("report"), createAppointment);
router.get("/", protect, getMyAppointments);

export default router;
