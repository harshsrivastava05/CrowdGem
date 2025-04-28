"use client";

import { useState, useEffect } from "react";
import HotspotCard from "../ui/HotspotCard";
import { getHotspots } from "../../../lib/utils/api-client";

export default function PopularHotspots() {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noHotspots, setNoHotspots] = useState(false);

  useEffect(() => {
    async function fetchHotspots() {
      try {
        const data = await getHotspots();

        if (!data || data.length === 0) {
          setNoHotspots(true);
          // Fall back to sample data
          setHotspots([
            {
              _id: "1",
              name: "Central Park",
              location: "New York, NY",
              image: "/images/central-park.jpg",
              likes: 215,
            },
            {
              _id: "2",
              name: "Sunset Roost",
              location: "Downtown, LA",
              image: "/images/sunset-roost.png",
              likes: 174,
            },
            {
              _id: "3",
              name: "The Artisan Cafe",
              location: "East Side, Austin",
              image: "/images/cafe.png",
              likes: 160,
            },
          ]);
        } else {
          // Sort by likes to get the most popular ones
          const sortedHotspots = data.sort((a, b) => b.likes - a.likes).slice(0, 3);

          if (sortedHotspots.length === 0) {
            setNoHotspots(true);
          } else {
            setHotspots(sortedHotspots);
          }
        }
      } catch (err) {
        console.error("Error fetching hotspots:", err);
        setError("Failed to load hotspots");
        // Fall back to sample data if API fails
        setHotspots([
          {
            _id: "1",
            name: "Central Park",
            location: "New York, NY",
            image: "/images/central-park.jpg",
            likes: 215,
          },
          {
            _id: "2",
            name: "Sunset Roost",
            location: "Downtown, LA",
            image: "/images/sunset-roost.png",
            likes: 174,
          },
          {
            _id: "3",
            name: "The Artisan Cafe",
            location: "East Side, Austin",
            image: "/images/cafe.png",
            likes: 160,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchHotspots();
  }, []);

  if (loading) {
    return (
      <div className="my-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Popular Hotspots</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error && hotspots.length === 0) {
    return (
      <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Hotspots</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (noHotspots && hotspots.length === 0) {
    return (
      <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Hotspots</h2>
        <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-6 rounded text-center">
          <p className="text-lg">No popular hotspots found at the moment.</p>
          <p className="mt-2">Be the first to add and like a hotspot!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-center mb-6">Popular Hotspots</h2>
      {noHotspots && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
          No real hotspots found. Showing sample data instead.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotspots.map((hotspot) => (
          <HotspotCard key={hotspot._id} hotspot={{ ...hotspot, id: hotspot._id }} />
        ))}
      </div>
    </div>
  );
}