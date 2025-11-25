import express from "express";
import {
  getDashboardOverview,
  getDashboardStats
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/overview", getDashboardOverview);
router.get("/stats", getDashboardStats);

export default router;