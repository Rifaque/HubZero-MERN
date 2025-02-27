const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  teamMemberId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, // Link to Team.js

  bio: { type: String }, // Short introduction
  experience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date, // null if currently working
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      startYear: Number,
      endYear: Number,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
      link: String,
      techStack: [String],
    },
  ],
  skills: [String], // List of skills
  certifications: [
    {
      name: String,
      issuedBy: String,
      date: Date,
      certificateUrl: String, // URL to uploaded certificate (image/PDF)
    },
  ],
  profilePicture: String, // URL to profile image (stored in Cloudinary)
  createdAt: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
