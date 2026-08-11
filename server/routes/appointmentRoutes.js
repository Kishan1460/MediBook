import express from "express";
import { createAppointment, getMyAppointments } from "../controllers/appointmentController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Manage patient appointments
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments for logged-in patient
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by year e.g. 2025
 *     responses:
 *       200:
 *         description: List of appointments
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [specialty, date, timeSlot]
 *             properties:
 *               specialty:
 *                 type: string
 *                 enum: [General Physician, Cardiologist, Dermatologist, Neurologist, Orthopedist, Ophthalmologist]
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-01"
 *               timeSlot:
 *                 type: string
 *                 example: "10:00 AM"
 *               notes:
 *                 type: string
 *                 example: Chest pain since 3 days
 *               report:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 */



router.post("/", protect, upload.single("report"), createAppointment);
router.get("/", protect, getMyAppointments);

export default router;
