import express from "express";
// Fix the import path to match the actual file name
import panicController from "../controllers/panic.controller";

const router = express.Router();

// POST /api/panic - Create a new panic alert
router.post("/", panicController.createPanic);

// GET /api/panic - Get all panic alerts
router.get("/", panicController.getAllPanics);

// GET /api/panic/:id - Get a single panic alert by ID
router.get("/:id", panicController.getPanicById);

export default router;
