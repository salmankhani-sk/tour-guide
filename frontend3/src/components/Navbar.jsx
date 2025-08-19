import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const menuVariants = {
  open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  closed: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side: Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Tour Guide Pakistan
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/about" className="hover:text-blue-200 transition">
            About
          </Link>

          {user ? (
            <div className="relative">
              {/* Profile button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-blue-700 px-3 py-1 rounded-full hover:bg-blue-800 transition"
              >
                <FaUserCircle size={20} />
                <span className="font-medium">{user.name}</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200 transition">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-700 p-6 flex flex-col gap-4 md:hidden z-50 ${
          isOpen ? "block" : "hidden"
        }`}
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <button
          onClick={toggleMenu}
          className="self-end text-white mb-4"
          aria-label="Close menu"
        >
          <FaTimes size={24} />
        </button>

        {user && (
          <div className="flex items-center gap-2 bg-blue-800 px-3 py-2 rounded">
            <FaUserCircle size={22} />
            <span className="text-lg">{user.name}</span>
          </div>
        )}

        <Link to="/about" className="text-lg hover:underline" onClick={toggleMenu}>
          About
        </Link>
        {user ? (
          <>
            {user.isAdmin && (
              <Link to="/admin" className="text-lg hover:underline" onClick={toggleMenu}>
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="text-lg hover:underline text-left"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-lg hover:underline" onClick={toggleMenu}>
              Login
            </Link>
            <Link to="/register" className="text-lg hover:underline" onClick={toggleMenu}>
              Signup
            </Link>
          </>
        )}
      </motion.div>
    </nav>
  );
}
