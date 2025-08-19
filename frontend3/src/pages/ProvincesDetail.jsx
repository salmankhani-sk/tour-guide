import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import api from "../api";

const BACKEND_URL = "http://localhost:5000"; // Change when deploying

// Animation variants for the title
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation variants for the card container (staggered effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger each card by 0.2s
    },
  },
};

// Animation variants for individual cards
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Hover effect for cards
const cardHover = {
  scale: 1.05,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  transition: { duration: 0.3 },
};

export default function ProvinceDetails() {
  const { name } = useParams();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  // Fetch places by province
  useEffect(() => {
    setPlaces([]);
    setError("");
    api
      .get(`/places/province/${encodeURIComponent(name)}`)
      .then((res) => setPlaces(res.data))
      .catch((err) => {
        console.error("Error fetching places:", err);
        setError("❌ Failed to load places");
      });
  }, [name]);

  // Helper to fix image URLs
  function getImageUrl(imgPath) {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${BACKEND_URL}${imgPath}`;
  }

  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h2
        className="text-3xl font-bold mb-6"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        {name} — Tourist Places
      </motion.h2>

      {places.length === 0 ? (
        <p className="text-gray-500">No places added yet in {name}.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {places.map((p) => (
            <motion.div
              key={p._id}
              variants={cardVariants}
              whileHover={cardHover}
            >
              <Link
                to={`/place/${p._id}`}
                className="bg-white shadow rounded overflow-hidden"
              >
                <img
                  src={getImageUrl(p.image)}
                  alt={p.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-gray-600">{p.district || "N/A"}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    From Rs. {p.price ? p.price : "N/A"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}