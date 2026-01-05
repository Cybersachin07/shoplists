import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  markOrderPaid,
  markOrderDelivered,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/pay", protect, adminOnly, markOrderPaid);
router.put("/:id/deliver", protect, adminOnly, markOrderDelivered);

export default router;
