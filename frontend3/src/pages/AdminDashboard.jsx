
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../api";
import provinces from "../data/provinces";

const BACKEND_URL = "http://localhost:5000"; // change when deploying

export default function AdminDashboard() {
  const [form, setForm] = useState({
    name: "",
    province: "",
    district: "",
    description: "",
    image: "",
    price: "",
    services: { hotel: false, meal: false, jeep: false, car: false },
  });

  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch all places
  useEffect(() => {
    loadPlaces();
  }, []);

  async function loadPlaces() {
    try {
      const res = await api.get("/places");
      setPlaces(res.data);
    } catch (err) {
      console.error("Error loading places:", err);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (["hotel", "meal", "jeep", "car"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        services: { ...prev.services, [name]: checked },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  // ✅ Handle image upload
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, image: res.data.imageUrl }));
      setMsg("✅ Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMsg("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  // ✅ Submit new place
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...form, price: parseInt(form.price || 0) };
      const res = await api.post("/places", payload);
      setMsg("✅ Place added: " + res.data.place.name);
      setForm({
        name: "",
        province: "",
        district: "",
        description: "",
        image: "",
        price: "",
        services: { hotel: false, meal: false, jeep: false, car: false },
      });
      loadPlaces();
    } catch (err) {
      console.error(err);
      setMsg("❌ Error adding place");
    }
  }

  // ✅ Load bookings for a selected place
  async function viewBookings(id) {
    setSelectedPlace(id);
    try {
      const res = await api.get(`/places/${id}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    }
  }

  // ✅ Handle delete place
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this place?")) return;
    try {
      await api.delete(`/places/${id}`);
      setMsg("✅ Place deleted successfully!");
      loadPlaces(); // Refresh the places list
    } catch (err) {
      console.error("Error deleting place:", err);
      setMsg("❌ Error deleting place");
    }
  }

  // ✅ Helper to fix image URLs
  function getImageUrl(imgPath) {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${BACKEND_URL}${imgPath}`;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Add Place Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-10 space-y-3"
      >
        <h3 className="text-xl font-semibold">➕ Add New Place</h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Place name"
          className="border px-3 py-2 w-full rounded"
          required
        />
        <select
          name="province"
          value={form.province}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          required
        >
          <option value="" disabled>
            Select Province
          </option>
          {provinces.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          name="district"
          value={form.district}
          onChange={handleChange}
          placeholder="District"
          className="border px-3 py-2 w-full rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-3 py-2 w-full rounded"
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p className="text-blue-600 text-sm">Uploading...</p>}
          {form.image && (
            <img
              src={getImageUrl(form.image)}
              alt="Preview"
              className="h-32 mt-2 rounded border object-cover"
            />
          )}
        </div>

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (PKR)"
          type="number"
          className="border px-3 py-2 w-full rounded"
        />

        {/* Services Checkboxes */}
        <div className="grid grid-cols-2 gap-2">
          {["hotel", "meal", "jeep", "car"].map((service) => (
            <label key={service}>
              <input
                type="checkbox"
                name={service}
                checked={form.services[service]}
                onChange={handleChange}
              />{" "}
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </label>
          ))}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Place
        </button>
        {msg && <p className="mt-2 text-green-600">{msg}</p>}
      </form>

      {/* List of Places */}
      <div>
        <h3 className="text-xl font-semibold mb-3">📍 All Places</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {places.map((p) => (
            <div
              key={p._id}
              className="border rounded p-4 bg-white shadow flex flex-col"
            >
              <img
                src={getImageUrl(p.image)}
                alt={p.name}
                className="h-32 w-full object-cover rounded mb-2"
              />
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm text-gray-600">
                {p.province}, {p.district}
              </p>
              <p className="text-sm mt-1">Rs. {p.price}</p>
              <p className="text-xs mt-1">
                Services:{" "}
                {Object.entries(p.services || {})
                  .filter(([k, v]) => v)
                  .map(([k]) => k)
                  .join(", ") || "None"}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  className="text-blue-600 underline text-sm"
                  onClick={() => viewBookings(p._id)}
                >
                  View Bookings
                </button>
                <button
                  className="text-red-600 underline text-sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings for a Place */}
      {selectedPlace && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">
            📝 Bookings for{" "}
            {places.find((p) => p._id === selectedPlace)?.name}
          </h3>
          {bookings.length > 0 ? (
            <ul className="space-y-2">
              {bookings.map((b, i) => (
                <li key={i} className="border p-3 rounded bg-gray-50">
                  <p>
                    <strong>Name:</strong> {b.userName}
                  </p>
                  <p>
                    <strong>Email:</strong> {b.userEmail}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(b.date).toLocaleString()}
                  </p>
                  {b.image && (
                    <img
                      src={getImageUrl(b.image)}
                      alt="Booking proof"
                      className="h-24 mt-2 border rounded"
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No bookings yet.</p>
          )}
        </div>
      )}
    </div>
  );
}