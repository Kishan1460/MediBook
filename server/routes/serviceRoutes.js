import express from "express";
import { getServices } from "../controllers/serviceController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Hospital services
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all available hospital services
 *     tags: [Services]
 *     security: []
 *     responses:
 *       200:
 *         description: List of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   available:
 *                     type: boolean
 */

router.get("/", getServices);

export default router;
