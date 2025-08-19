import React from "react";
import { Link } from "react-router-dom";
import districts from "../data/districts";

export default function Districts() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Districts of Pakistan</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {districts.map(d => (
          <Link
            key={d}
            to={`/district/${encodeURIComponent(d)}`}
            className="bg-white border rounded p-3 hover:shadow text-center"
          >
            {d}
          </Link>
        ))}
      </div>
    </div>
  );
}
