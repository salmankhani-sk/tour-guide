// import mongoose from "mongoose";

// const placeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   province: { type: String, required: true },
//   district: { type: String, required: true },
//   description: String,
//   image: String,
//   price: Number,
//   services: {
//     hotel: Boolean,
//     meal: Boolean,
//     jeep: Boolean,
//     car: Boolean
//   },
//   bookings: [
//     {
//       userName: String,
//       userEmail: String,
//       date: { type: Date, default: Date.now }
//     }
//   ]
// });

// const Place = mongoose.model("Place", placeSchema);
// export default Place;
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  description: String,
  image: String,
  price: Number,
  services: {
    hotel: Boolean,
    meal: Boolean,
    jeep: Boolean,
    car: Boolean
  },
  bookings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Optional user reference
      userName: String,
      userEmail: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

const Place = mongoose.model("Place", placeSchema);
export default Place;