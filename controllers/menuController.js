

import Menu from "../models/menuModel.js";


export const addMenuItem = async (req, res) => {
  try {
    console.log("🔥 ADD MENU HIT");

    const { name, description, price, category } = req.body;

   
    const image = req.file ? req.file.path : null;


    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields including image are required",
      });
    }

    const newMenu = await Menu.create({
      name,
      description,
      price,
      category,
      image,
    });

    console.log("✅ SAVED:", newMenu);

    res.status(201).json({
      success: true,
      message: "Menu item added",
      menuItem: newMenu,
    });
  } catch (error) {
    console.log("❌ ADD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    console.log("🔥 GET MENU HIT");

    const menuItems = await Menu.find().populate("category");

    res.json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.log("❌ GET ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    // ✅ if new image uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedMenu = await Menu.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Menu item updated",
      menuItem: updatedMenu,
    });
  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    await Menu.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Menu item deleted",
    });
  } catch (error) {
    console.log("❌ DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};