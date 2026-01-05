import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create category (protected for now)
router.post("/", protect, createCategory);

// Get all categories (public)
router.get("/", getCategories);

export default router;
