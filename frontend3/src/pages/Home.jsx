
// frontend3/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import provinces from "../data/provinces";

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

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold mb-6"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Explore Pakistan
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {provinces.map((p) => (
          <motion.div
            key={p.name}
            variants={cardVariants}
            whileHover={cardHover} // Apply hover effect
          >
            <Link
              to={`/province/${encodeURIComponent(p.name)}`}
              className="bg-white shadow rounded overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}