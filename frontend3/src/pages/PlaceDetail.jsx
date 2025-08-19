import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const BACKEND_URL = "http://localhost:5000"; // ✅ Change when deploying

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [booking, setBooking] = useState({ userName: "", userEmail: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch place details by ID
  useEffect(() => {
    setPlace(null); // Reset place to show loading state
    setError(""); // Reset error
    api
      .get(`/places/${id}`)
      .then((res) => setPlace(res.data))
      .catch((err) => {
        console.error("Error fetching place:", err);
        setError("❌ Failed to load place details");
      });
  }, [id]);

  // ✅ Handle booking submission
  async function handleBook(e) {
    e.preventDefault();
    try {
      const res = await api.post(`/places/${id}/book`, booking);
      setMsg("✅ " + res.data.message);
      setBooking({ userName: "", userEmail: "" });
      setError("");
    } catch (err) {
      console.error("Error booking place:", err);
      setMsg("");
      setError("❌ Error booking place");
    }
  }

  // ✅ Helper to fix image URLs
  function getImageUrl(imgPath) {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${BACKEND_URL}${imgPath}`;
  }

  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!place) return <p className="text-gray-500 text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <img
        src={getImageUrl(place.image)}
        alt={place.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold">{place.name}</h1>
      <p className="text-gray-600">
        {place.district}, {place.province}
      </p>
      <p className="mt-3">{place.description || "No description available."}</p>

      <div className="mt-4">
        <p>
          <strong>Price:</strong> Rs. {place.price || "N/A"}
        </p>
        <p>
          <strong>Services:</strong>
        </p>
        <ul className="list-disc ml-6 text-gray-700">
          {place.services?.hotel && <li>Hotel</li>}
          {place.services?.meal && <li>Meals</li>}
          {place.services?.jeep && <li>Jeep</li>}
          {place.services?.car && <li>Car</li>}
          {!Object.values(place.services || {}).some((v) => v) && (
            <li>None</li>
          )}
        </ul>
      </div>

      <form onSubmit={handleBook} className="mt-6 space-y-3">
        <h3 className="text-xl font-semibold">Book Now</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={booking.userName}
          onChange={(e) => setBooking({ ...booking, userName: e.target.value })}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={booking.userEmail}
          onChange={(e) => setBooking({ ...booking, userEmail: e.target.value })}
          className="border px-3 py-2 w-full rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Confirm Booking
        </button>
      </form>

      {msg && <p className="mt-3 text-green-600">{msg}</p>}
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
}