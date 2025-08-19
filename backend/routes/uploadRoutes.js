import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // save inside /backend/uploads
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload route
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    imageUrl: `/uploads/${req.file.filename}`, // ✅ URL returned to frontend
  });
});

export default router;