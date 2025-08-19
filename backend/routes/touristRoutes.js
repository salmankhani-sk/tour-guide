import express from "express";
import TouristPlace from "../models/TouristPlace.js";

const router = express.Router();

// Get all places
router.get("/", async (req, res) => {
    const places = await TouristPlace.find();
    res.json(places);
});

// Add a place (Admin only later)
router.post("/", async (req, res) => {
    const newPlace = new TouristPlace(req.body);
    await newPlace.save();
    res.json({ message: "Place added", place: newPlace });
});

export default router;