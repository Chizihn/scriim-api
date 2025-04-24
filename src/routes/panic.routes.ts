import express from "express";
// Fix the import path to match the actual file name
import panicController from "../controllers/panic.controller";

const router = express.Router();

/**
 * @swagger
 * /api/panic:
 *   post:
 *     summary: Create a new panic alert
 *     tags: [Panics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - contacts
 *             properties:
 *               name:
 *                 type: string
 *               userName:
 *                 type: string
 *               location:
 *                 type: object
 *                 required:
 *                   - latitude
 *                   - longitude
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - phoneNumber
 *                   properties:
 *                     name:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     email:
 *                       type: string
 *               authorityType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Panic alert created successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */

// POST /api/panic - Create a new panic alert
router.post("/", panicController.createPanic);

/**
 * @swagger
 * /api/panic:
 *   get:
 *     summary: Get all panic alerts
 *     tags: [Panics]
 *     responses:
 *       200:
 *         description: A list of panic alerts
 *       500:
 *         description: Server error
 */

// GET /api/panic - Get all panic alerts
router.get("/", panicController.getAllPanics);

/**
 * @swagger
 * /api/panic/{id}:
 *   get:
 *     summary: Get a panic alert by ID
 *     tags: [Panics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The panic alert ID
 *     responses:
 *       200:
 *         description: Panic alert retrieved successfully
 *       404:
 *         description: Panic alert not found
 *       500:
 *         description: Server error
 */

// GET /api/panic/:id - Get a single panic alert by ID
router.get("/:id", panicController.getPanicById);

export default router;
