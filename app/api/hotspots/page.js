"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHotspots } from "@/lib/utils/api-client";
import HotspotCard from "@/app/components/ui/HotspotCard";

export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: "🌟" },
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "parks", name: "Parks", icon: "🌳" },
    { id: "nightlife", name: "Nightlife", icon: "🍸" },
    { id: "shopping", name: "Shopping", icon: "🛍️" },
    { id: "culture", name: "Culture", icon: "🎭" },
    { id: "activities", name: "Activities", icon: "🏄‍♂️" },
  ];

  useEffect(() => {
    async function fetchHotspots() {
      try {
        const data = await getHotspots();
        setHotspots(data);
      } catch (err) {
        console.error("Error fetching hotspots:", err);
        setError("Failed to load hotspots");
      } finally {
        setLoading(false);
      }
    }

    fetchHotspots();
  }, []);

  const filteredHotspots =
    activeCategory === "all"
      ? hotspots
      : hotspots.filter(
          (hotspot) => hotspot.category.toLowerCase() === activeCategory
        );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">All Hotspots</h1>

      {/* Category filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full transition ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : filteredHotspots.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No hotspots found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotspots.map((hotspot) => (
            <HotspotCard
              key={hotspot._id}
              hotspot={{ ...hotspot, id: hotspot._id }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
