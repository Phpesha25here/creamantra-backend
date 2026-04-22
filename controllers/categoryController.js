import Category from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";

/* =========================
   ➕ ADD CATEGORY (ADMIN)
========================= */
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name and image are required",
      });
    }

    const alreadyExists = await Category.findOne({ name });
    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newCategory = await Category.create({
      name,
      image: result.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Category added",
      category: newCategory,
    });
  } catch (error) {
    console.log("ADD CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   📄 GET ALL (PUBLIC)
========================= */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log("GET CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   ✏️ UPDATE (ADMIN)
========================= */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      category.image = result.secure_url;
    }

    if (name) category.name = name;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   ❌ DELETE (ADMIN)
========================= */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    console.log("DELETE CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};