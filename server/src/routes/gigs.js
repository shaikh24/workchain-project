import express from "express";
import Gig from "../models/Gig.js";

const router = express.Router();

// ✅ Get all gigs
router.get("/", async (req, res) => {
  const gigs = await Gig.find();
  res.json(gigs);
});

// ✅ Get single gig by ID
router.get("/:id", async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  res.json(gig);
});

// ✅ Create new gig
router.post("/", async (req, res) => {
  const newGig = new Gig(req.body);
  await newGig.save();
  res.json(newGig);
});

export default router;
