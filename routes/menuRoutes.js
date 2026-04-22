import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  updateMenuItem
} from "../controllers/menuController.js";

const menuRoutes = express.Router();

menuRoutes.post("/add", protect, adminOnly, upload.single("image"), addMenuItem);
menuRoutes.put("/update/:id", protect, adminOnly, upload.single("image"), updateMenuItem);
menuRoutes.delete("/delete/:id", protect, adminOnly, deleteMenuItem);
menuRoutes.get("/all", getAllMenuItems);

export default menuRoutes;