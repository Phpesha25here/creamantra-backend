import Menu from "../models/menuModel.js";

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

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

    res.status(201).json({
      success: true,
      message: "Menu item added",
      menuItem: newMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find().populate("category");

    res.json({
      success: true,
      menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};