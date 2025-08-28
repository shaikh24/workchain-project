import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import gigsRoutes from "./routes/gigs.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connection
mongoose.connect("mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/workchain")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/gigs", gigsRoutes);

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
