const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const Admin = require("../models/Admin");
const authMiddleware = require("../middlewares/authMiddleware");
require("dotenv").config();

const router = express.Router();
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Rate limiter: 5 attempts per minute
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Too many login attempts. Try again later."
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate JWT Token
const generateToken = (admin) => {
    return jwt.sign(
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        username: admin.username, // ✅ Add this line
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  };

// Store OTPs in memory (consider Redis for production)
const otps = {};

// Send OTP to email
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ error: "Admin not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = { otp, expiresAt: Date.now() + OTP_EXPIRY };

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Hub Zero Admin Login",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
  });

  res.json({ message: "OTP sent to email" });
});

// Verify OTP and Login
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!otps[email] || otps[email].expiresAt < Date.now()) {
    return res.status(400).json({ error: "OTP expired or invalid" });
  }
  if (otps[email].otp !== otp) {
    return res.status(400).json({ error: "Incorrect OTP" });
  }
  delete otps[email]; // OTP used, remove from memory
  
  const admin = await Admin.findOne({ email });
  const token = generateToken(admin);
  res.json({ token });
});

// Password Login
router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ error: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ error: "Incorrect password" });

  const token = generateToken(admin);
  res.json({ token });
});

// Register Admin (Only Main Admin Can Create Admins)
router.post("/register", async (req, res) => {
    const { name, username, email, password, role, requesterEmail } = req.body;
  
    // Ensure requester is the main admin
    const requester = await Admin.findOne({ email: requesterEmail });
    if (!requester || requester.role !== "main-admin") {
      return res.status(403).json({ error: "Only the main admin can create new admins" });
    }
  
    // Check if email or username already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) return res.status(400).json({ error: "Email or username already exists" });
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, username, email, password: hashedPassword, role });
    await newAdmin.save();
  
    res.status(201).json({ message: "Admin created successfully" });
  });
  
// ✅ Delete Portfolio by Username (Only Main Admin or the Owner Can Delete)
router.delete("/:username", authMiddleware, async (req, res) => {
    const { username } = req.params;
  
    // Find the team member by username
    const teamMember = await Team.findOne({ username });
    if (!teamMember) return res.status(404).json({ error: "Team member not found" });
  
    // Ensure the authenticated admin is the owner or a main admin
    if (req.admin.role !== "main-admin" && req.admin.username !== username) {
      return res.status(403).json({ error: "You are not authorized to delete this portfolio" });
    }
  
    // Delete portfolio
    await Portfolio.findOneAndDelete({ teamMemberId: teamMember._id });
  
    res.json({ message: "Portfolio deleted successfully" });
  });
  
// Get List of All Admins (Only Main Admin Can View)
router.get("/list", authMiddleware, async (req, res) => {
    if (req.admin.role !== "main-admin") {
      return res.status(403).json({ error: "Only the main admin can view all admins" });
    }
  
    const admins = await Admin.find({}, "name username email role createdAt");
    res.json(admins);
});

// ✅ Get Admin Info (Verify Authentication)
router.get("/me", authMiddleware, async (req, res) => {
    const admin = await Admin.findById(req.admin.id).select("-password");
    console.log("DEBUG: Admin Data from DB ->", admin); // 🔥 Add this
  
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
  
    res.json(admin); // 🔥 Send the whole admin object as response
  });
  
  




module.exports = router;
