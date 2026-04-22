import express from "express";

const router = express.Router();

// 🔥 IMPORTANT: "/" because base path is already /api/contact
router.post("/", (req, res) => {
  console.log("✅ HIT CONTACT API");

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  return res.json({
    success: true,
    message: "Message received",
  });
});

export default router;