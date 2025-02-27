const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name
  username: { type: String, required: true, unique: true }, // Single-word name for routes
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["main-admin", "admin"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Admin", adminSchema);

