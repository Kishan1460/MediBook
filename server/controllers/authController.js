import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, phone, password });
    const token = generateToken(user._id);

    res.status(201).json({ token, user: user.toSafeObject() });
  } catch (error) {
    res.status(500).json({ message: error.message || "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.json({ token, user: user.toSafeObject() });
  } catch (error) {
    res.status(500).json({ message: error.message || "Login failed" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: user.toSafeObject() });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password;
    delete updates.email;

    if (req.file) {
      updates.profilePicture = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: user.toSafeObject() });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update profile" });
  }
};
