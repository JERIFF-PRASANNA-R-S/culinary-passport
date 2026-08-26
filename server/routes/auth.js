import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Helper to create JWT
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// @route   POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, countryCode, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      countryCode,
      phone,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        infoCompleted: newUser.infoCompleted,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// @route   POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Email/username and password are required." });
    }

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { name: identifier },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email/username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email/username or password." });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        infoCompleted: user.infoCompleted,
        firstName: user.firstName,
        lastName: user.lastName,
        profile: user.profile,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
});

// @route   PUT /api/auth/complete-info
router.put("/complete-info", async (req, res) => {
  try {
    const { userId, firstName, lastName, profile } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, infoCompleted: true, profile },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        infoCompleted: user.infoCompleted,
        firstName: user.firstName,
        lastName: user.lastName,
        profile: user.profile,
      },
    });
  } catch (err) {
    console.error("Complete-info error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;