import express from "express";
import { getDashboardStats } from "../controllers/reportController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);

export default router;