import React from "react";
import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  if (!place) return null; // safety check

  const { name = "Unknown Place", district = "Unknown District", description = "", image, location } = place;

  return (
    <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition">
      {/* Image */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-40 w-full object-cover rounded"
        />
      ) : (
        <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-gray-500 rounded">
          No Image
        </div>
      )}

      {/* Text */}
      <h3 className="mt-3 font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-600">{district}</p>
      <p className="text-sm mt-2 line-clamp-3">{description || "No description available."}</p>

      {/* Map Placeholder (we removed API) */}
      {location && location.lat && location.lng ? (
        <p className="mt-2 text-xs text-gray-500">
          Coordinates: {location.lat}, {location.lng}
        </p>
      ) : (
        <p className="mt-2 text-xs text-gray-400">No location provided</p>
      )}

      {/* Link to District Page */}
      <div className="mt-3">
        <Link
          to={`/district/${encodeURIComponent(district)}`}
          className="text-blue-600 text-sm"
        >
          See all in {district}
        </Link>
      </div>
    </div>
  );
}
