// // backend/routes/placeRoutes.js
// import express from "express";
// import Place from "../models/Place.js";
// import { protect, verifyAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // -------- Public: Read-only --------

// // Get all places
// router.get("/", async (req, res) => {
//   try {
//     const places = await Place.find();
//     res.json(places);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get places by province
// router.get("/province/:name", async (req, res) => {
//   try {
//     const province = req.params.name;
//     const places = await Place.find({ province });
//     res.json(places);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get single place
// router.get("/:id", async (req, res) => {
//   try {
//     const place = await Place.findById(req.params.id);
//     if (!place) return res.status(404).json({ error: "Place not found" });
//     res.json(place);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Book a place (public for your FYP flow)
// router.post("/:id/book", async (req, res) => {
//   try {
//     const { userName, userEmail, image } = req.body;
//     const place = await Place.findById(req.params.id);
//     if (!place) return res.status(404).json({ error: "Place not found" });

//     place.bookings.push({ userName, userEmail, image });
//     await place.save();

//     res.json({ message: "Booking successful", place });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // -------- Admin-only: Create/Update/Delete & view bookings --------

// // Valid provinces
// const validProvinces = [
//   "Islamabad Capital Territory",
//   "Punjab",
//   "Khyber Pakhtunkhwa",
//   "Sindh",
//   "Balochistan",
//   "Gilgit-Baltistan",
//   "Azad Jammu & Kashmir",
// ];

// // Add new place
// router.post("/", protect, verifyAdmin, async (req, res) => {
//   try {
//     const { province } = req.body;
//     if (!validProvinces.includes(province)) {
//       return res.status(400).json({ error: "Invalid province" });
//     }
//     const place = new Place(req.body);
//     await place.save();
//     res.json({ message: "Place added", place });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update place
// router.put("/:id", protect, verifyAdmin, async (req, res) => {
//   try {
//     const updated = await Place.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated) return res.status(404).json({ error: "Place not found" });
//     res.json({ message: "Place updated", place: updated });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete place
// router.delete("/:id", protect, verifyAdmin, async (req, res) => {
//   try {
//     const place = await Place.findByIdAndDelete(req.params.id);
//     if (!place) return res.status(404).json({ error: "Place not found" });
//     res.json({ message: "Place deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // View bookings (admin only)
// router.get("/:id/bookings", protect, verifyAdmin, async (req, res) => {
//   try {
//     const place = await Place.findById(req.params.id);
//     if (!place) return res.status(404).json({ error: "Place not found" });
//     res.json(place.bookings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
import express from "express";
import Place from "../models/Place.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------- Public: Read-only --------

router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/province/:name", async (req, res) => {
  try {
    const province = req.params.name;
    const places = await Place.find({ province });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book a place (public, but include userId if logged in)
router.post("/:id/book", protect, async (req, res) => {
  try {
    const { userName, userEmail } = req.body;
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });

    const booking = {
      userId: req.user ? req.user._id : null, // Include userId if logged in
      userName: userName || req.user?.name || "Anonymous",
      userEmail: userEmail || req.user?.email || "",
      date: new Date()
    };

    place.bookings.push(booking);
    await place.save();

    res.json({ message: "Booking successful", place });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------- Admin-only: Create/Update/Delete & view bookings --------

const validProvinces = [
  "Islamabad Capital Territory",
  "Punjab",
  "Khyber Pakhtunkhwa",
  "Sindh",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
];

router.post("/", protect, verifyAdmin, async (req, res) => {
  try {
    const { province } = req.body;
    if (!validProvinces.includes(province)) {
      return res.status(400).json({ error: "Invalid province" });
    }
    const place = new Place(req.body);
    await place.save();
    res.json({ message: "Place added", place });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", protect, verifyAdmin, async (req, res) => {
  try {
    const updated = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Place not found" });
    res.json({ message: "Place updated", place: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", protect, verifyAdmin, async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });
    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id/bookings", protect, verifyAdmin, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('bookings.userId', 'name email');
    if (!place) return res.status(404).json({ error: "Place not found" });
    res.json(place.bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;