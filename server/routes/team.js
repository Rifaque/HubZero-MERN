const express = require("express");
const Team = require("../models/Team");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Add a Team Member (Main Admin Only)
router.post("/add", authMiddleware, async (req, res) => {
  const { name, username, role, photo } = req.body;

  // Only main admin can add team members
  if (req.admin.role !== "main-admin") {
    return res.status(403).json({ error: "Only the main admin can add team members" });
  }

  // Check if username already exists
  const existingMember = await Team.findOne({ username });
  if (existingMember) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const newMember = new Team({ name, username, role, photo });
  await newMember.save();

  res.status(201).json({ message: "Team member added successfully", member: newMember });
});

// ✅ Update a Team Member (Main Admin Only)
router.put("/update/:username", authMiddleware, async (req, res) => {
  const { name, role, photo } = req.body;

  // Only main admin can update team members
  if (req.admin.role !== "main-admin") {
    return res.status(403).json({ error: "Only the main admin can update team members" });
  }

  const updatedMember = await Team.findOneAndUpdate(
    { username: req.params.username },
    { name, role, photo },
    { new: true }
  );

  if (!updatedMember) return res.status(404).json({ error: "Team member not found" });

  res.json({ message: "Team member updated successfully", member: updatedMember });
});

// ✅ Delete a Team Member (Main Admin Only)
router.delete("/delete/:username", authMiddleware, async (req, res) => {
  // Only main admin can delete team members
  if (req.admin.role !== "main-admin") {
    return res.status(403).json({ error: "Only the main admin can delete team members" });
  }

  const deletedMember = await Team.findOneAndDelete({ username: req.params.username });

  if (!deletedMember) return res.status(404).json({ error: "Team member not found" });

  res.json({ message: "Team member deleted successfully" });
});

// ✅ Fetch All Team Members
router.get("/", async (req, res) => {
  const team = await Team.find();
  res.json(team);
});

module.exports = router;
