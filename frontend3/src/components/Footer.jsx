import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants for footer sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
  },
};

export default function Footer() {
  return (
    <motion.footer
      className="bg-blue-600 text-white py-8"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">Tour Guide Pakistan</h3>
          <p className="text-sm">
            Discover the beauty of Pakistan with ease. Explore provinces, book
            adventures, and plan your perfect trip.
          </p>
        </div>

        {/* Simplified Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About the Project</h3>
          <p className="text-sm">
            Developed by <span className="font-semibold">Naveed</span> with
            passion for promoting tourism in Pakistan.
          </p>
          <p className="text-sm mt-2">
            &copy; {new Date().getFullYear()} Tour Guide Pakistan. All rights
            reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}