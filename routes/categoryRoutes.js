import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/add", protect, adminOnly, upload.single("image"), addCategory);
router.put("/update/:id", protect, adminOnly, upload.single("image"), updateCategory);
router.delete("/delete/:id", protect, adminOnly, deleteCategory);
router.get("/all", getAllCategories);

export default router;