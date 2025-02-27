const express = require("express");
const Portfolio = require("../models/Portfolio");
const Team = require("../models/Team");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Create or Update Portfolio (Admins can edit only their own portfolio)
router.post("/save", authMiddleware, async (req, res) => {
    console.log("DEBUG: Authenticated Admin ->", req.admin); // 🔥 Log authenticated admin
  
    const { bio, experience, education, projects, skills, certifications, profilePicture } = req.body;
  
    // Find team member based on username from the authenticated admin
    const teamMember = await Team.findOne({ username: req.admin.username });
  
    console.log("DEBUG: Matched Team Member ->", teamMember); // 🔥 Log matched team member
  
    if (!teamMember) {
      return res.status(403).json({ error: "You are not associated with any team member profile" });
    }
  
    // Update or create portfolio
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { teamMemberId: teamMember._id },
      { bio, experience, education, projects, skills, certifications, profilePicture },
      { new: true, upsert: true }
    );
  
    res.json({ message: "Portfolio saved successfully", portfolio: updatedPortfolio });
});
  

// ✅ Fetch Portfolio by Team Member Username
router.get("/:username", async (req, res) => {
    const { username } = req.params;
    
    // Find the team member using username
    const teamMember = await Team.findOne({ username });
    if (!teamMember) return res.status(404).json({ error: "Team member not found" });
  
    // Find portfolio using the teamMemberId
    const portfolio = await Portfolio.findOne({ teamMemberId: teamMember._id });
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
  
    res.json(portfolio);
  });
  

// ✅ Fetch All Portfolios (Only Main Admin Can Access)
router.get("/", authMiddleware, async (req, res) => {
  if (req.admin.role !== "main-admin") {
    return res.status(403).json({ error: "Only the main admin can view all portfolios" });
  }

  const portfolios = await Portfolio.find();
  res.json(portfolios);
});

module.exports = router;

