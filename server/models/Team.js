const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name
  username: { type: String, required: true, unique: true }, // Single-word name for routes
  role: { type: String, required: true },
  photo: { type: String, required: true } // Store image URL
});

module.exports = mongoose.model("Team", teamSchema);
