import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("GET USERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};