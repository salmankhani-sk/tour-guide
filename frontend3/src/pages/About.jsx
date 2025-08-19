import React from "react";
import { motion } from "framer-motion";

// Animation variants for the title
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation variants for the content
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        About Tour Guide Pakistan
      </motion.h1>
      <motion.div
        className="bg-white shadow rounded p-6"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="text-gray-700 mb-4">
          Tour Guide Pakistan is a comprehensive platform designed to help tourists explore the scenic beauty and cultural richness of Pakistan. From the majestic mountains of Gilgit-Baltistan to the vibrant cities of Punjab, our application allows users to discover tourist destinations, view detailed information about each place, and book their next adventure with ease.
        </p>
        <p className="text-gray-700 mb-4">
          Whether you’re planning a trip to a serene valley or a bustling urban center, Tour Guide Pakistan provides a seamless experience for browsing provinces, districts, and specific tourist spots, complete with pricing and service details. Our admin dashboard empowers administrators to manage places and bookings efficiently, ensuring a smooth experience for all users.
        </p>
        <p className="text-gray-700 font-semibold">
          This project was proudly developed by <span className="text-blue-600">Naveed</span>, a passionate developer dedicated to promoting tourism in Pakistan through innovative technology.
        </p>
      </motion.div>
    </div>
  );
}