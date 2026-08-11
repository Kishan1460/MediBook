import express from "express";
import { signup, login, getMe, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Patient authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new patient
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, phone, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 example: jane@email.com
 *               phone:
 *                 type: string
 *                 example: "+91 98765 43210"
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Email already registered or validation error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login patient and get JWT token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: jane@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in patient profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update current patient profile details and profile picture
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               phone:
 *                 type: string
 *                 example: "+91 98765 43210"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane@email.com
 *               addressLine1:
 *                 type: string
 *                 example: "Flat No. 402, Sunrise Apartments"
 *               addressLine2:
 *                 type: string
 *                 example: "Near Sector 12 Market"
 *               city:
 *                 type: string
 *                 example: "Dwarka"
 *               state:
 *                 type: string
 *                 example: "Delhi"
 *               zipcode:
 *                 type: string
 *                 example: "110075"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Upload profile picture file (JPG, JPEG, PNG)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       400:
 *         description: Validation error or invalid file type
 *       401:
 *         description: Unauthorized
 */

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/me", protect, upload.single("profilePicture"), updateProfile);

export default router;
