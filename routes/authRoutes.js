import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // ✅ keep this consistent
import { protect, adminOnly } from "../middlewares/authMiddleware.js"; // ✅ match middleware name

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ OPTIONAL: send token as cookie also
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "Lax",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token"); // ✅ important if using cookies

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});


// ================= GET USER PROFILE =================
router.get("/me", protect, async (req, res) => {
  try {
    // req.user already attached from middleware
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    console.log("PROFILE ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ================= ADMIN ROUTE =================
router.get("/admin", protect, adminOnly, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});


export default router;