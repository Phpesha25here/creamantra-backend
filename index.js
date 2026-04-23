import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://creamantra-frontend.vercel.app",
    ],
    credentials: true,
  })
);

const startServer = async () => {
  try {
    await connectDB();
    connectCloudinary();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);