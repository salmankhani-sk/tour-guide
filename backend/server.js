import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

import placeRoutes from "./routes/placeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyAdmin } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const ensureAdmin = async () => {
  const email = "naveed@gmail.com";
  const password = "12345";
  const exists = await User.findOne({ email });
  if (!exists) {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name: "Naveed", email, password: hashed, isAdmin: true });
    console.log("✅ Admin seeded:", email);
  } else {
    console.log("ℹ️ Admin already exists:", email);
  }
};
mongoose.connection.once('open', ensureAdmin);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/admin/places", verifyAdmin, placeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));