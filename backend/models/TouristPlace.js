import mongoose from "mongoose";

const touristPlaceSchema = new mongoose.Schema({
    name: String,
    district: String,
    description: String,
    image: String,
    location: {
        lat: Number,
        lng: Number
    }
});

export default mongoose.model("TouristPlace", touristPlaceSchema);