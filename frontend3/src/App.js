import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProvinceDetails from "./pages/ProvincesDetail";
import DistrictDetails from "./pages/DistrictDetails";
import PlaceDetails from "./pages/PlaceDetail";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Footer from "./components/Footer";

// Protected Route Component
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Loading...</p>;
  if (!user || !user.isAdmin) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <div>
      <Navbar /> {/* Add Navbar here */}

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/province/:name" element={<ProvinceDetails />} />
          <Route path="/district/:name" element={<DistrictDetails />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}