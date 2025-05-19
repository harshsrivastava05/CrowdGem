"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getHotspotsByLocation } from "../../lib/utils/api-client";
import { searchCities } from "../../lib/utils/location-utils";
import LocationSelector from "../components/LocationSelector";
import CategoryFilter from "../components/CategoryFilter";
import HotspotCard from "../components/HotspotCard";
import { MapPinIcon } from "lucide-react";

export default function ExploreContent() {
  const [hotspots, setHotspots] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const searchParams = useSearchParams();

  useEffect(() => {
    const locationParam = searchParams.get("location");
    if (locationParam) {
      setLocation(locationParam);
      fetchHotspots(locationParam);
    } else {
      promptForLocation();
    }
  }, [searchParams]);

  const promptForLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async () => {
          setLocation("Mumbai, Maharashtra");
          await fetchHotspots("Mumbai, Maharashtra");
          setLoading(false);
        },
        () => {
          setLocation("Mumbai, Maharashtra");
          fetchHotspots("Mumbai, Maharashtra");
          setLoading(false);
        }
      );
    } else {
      setLocation("Mumbai, Maharashtra");
      fetchHotspots("Mumbai, Maharashtra");
    }
  };

  const fetchHotspots = async (loc: string) => {
    setLoading(true);
    try {
      const data = await getHotspotsByLocation(loc);
      setHotspots(data);
    } catch (error) {
      console.error("Error fetching hotspots:", error);
      setHotspots(generateMockHotspots(loc));
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = async (newLocation: string) => {
    setLocation(newLocation);
    await fetchHotspots(newLocation);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredHotspots =
    selectedCategory === "all"
      ? hotspots
      : hotspots.filter((h) => h.category === selectedCategory);

  return (
    <>
      <div className="mb-8">
        <LocationSelector
          currentLocation={location}
          onLocationChange={handleLocationChange}
          searchCities={searchCities}
        />
      </div>

      {location && (
        <div className="flex items-center justify-center mb-6">
          <MapPinIcon className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-medium text-gray-700">
            Exploring gems in{" "}
            <span className="text-blue-600 font-semibold">{location}</span>
          </h2>
        </div>
      )}

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hotspots...</p>
        </div>
      ) : filteredHotspots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredHotspots.map((hotspot, i) => (
            <HotspotCard key={i} hotspot={hotspot} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">
            No hotspots found in this area for the selected category. Be the
            first to add one!
          </p>
        </div>
      )}
    </>
  );
}

// Helpers
function generateMockHotspots(location: string) {
  const categories = [
    "food",
    "parks",
    "nightlife",
    "shopping",
    "culture",
    "activities",
  ];
  const count = Math.floor(Math.random() * 10) + 5;
  return Array.from({ length: count }).map((_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      id: `hotspot-${i}`,
      name: getMockName(category),
      location,
      category,
      description: getMockDescription(category),
      averageSpend: Math.floor(Math.random() * 1500) + 200,
      image: `/api/placeholder/${300 + i}/${200 + i}`,
      likes: Math.floor(Math.random() * 200),
      addedBy: "Local Explorer",
      reviews: generateMockReviews(),
    };
  });
}

function getMockName(category: string) {
  const names = {
    food: ["Spice Garden", "The Secret Kitchen"],
    parks: ["Sunset Park", "Peace Valley"],
    nightlife: ["Moonshine Bar", "Echo's Den"],
    shopping: ["Heritage Bazaar", "Style Studio"],
    culture: ["Art Hub", "History House"],
    activities: ["Explorer's Path", "Thrill Valley"],
  };
  const categoryNames = names[category] || names.food;
  return categoryNames[Math.floor(Math.random() * categoryNames.length)];
}

function getMockDescription(category: string) {
  const descriptions = {
    food: "A hidden culinary gem locals love.",
    parks: "A serene green space for relaxation.",
    nightlife: "An underground hotspot with great vibes.",
    shopping: "A unique spot for handcrafted goods.",
    culture: "A cultural landmark with rich heritage.",
    activities: "An exciting place for adventure seekers.",
  };
  return descriptions[category] || descriptions.food;
}

function generateMockReviews() {
  return Array.from({ length: Math.floor(Math.random() * 5) }).map(() => ({
    user: `User${Math.floor(Math.random() * 1000)}`,
    text: "Great place! Definitely worth checking out.",
    rating: Math.floor(Math.random() * 2) + 4,
  }));
}
