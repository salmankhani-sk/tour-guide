import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function DistrictDetails() {
  const { name } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    api.get("/tourists")
      .then(res => setPlaces(res.data.filter(p => p.district === name)))
      .catch(console.error);
  }, [name]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold my-6">{name} — Places</h2>
      {places.length === 0 ? (
        <p className="text-gray-600">No places added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map(p => (
            <Link key={p._id} to={`/place/${p._id}`} className="bg-white rounded shadow overflow-hidden hover:shadow-lg">
              <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />
              <div className="p-3">
                <h3 className="font-semibold">{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
