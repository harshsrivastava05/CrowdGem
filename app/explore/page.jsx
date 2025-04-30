"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getHotspotsByLocation } from "../../lib/utils/api-client";
import { searchCities } from "../../lib/utils/location-utils";
import LocationSelector from "../components/LocationSelector";
import CategoryFilter from "../components/CategoryFilter";
import HotspotCard from "../components/HotspotCard";
import { MapPinIcon } from "lucide-react";

export default function ExplorePage() {
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
        if (typeof window !== "undefined" && navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const loc = "Mumbai, Maharashtra";
                        setLocation(loc);
                        await fetchHotspots(loc);
                    } catch (error) {
                        console.error("Location fetch error:", error);
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setLoading(false);
                    const loc = "Mumbai, Maharashtra";
                    setLocation(loc);
                    fetchHotspots(loc);
                }
            );
        } else {
            const loc = "Mumbai, Maharashtra";
            setLocation(loc);
            fetchHotspots(loc);
        }
    };

    const fetchHotspots = async (loc) => {
        setLoading(true);
        try {
            const data = await getHotspotsByLocation(loc);
            setHotspots(data);
        } catch (error) {
            console.error("Error fetching hotspots:", error);
            const mockHotspots = generateMockHotspots(loc);
            setHotspots(mockHotspots);
        } finally {
            setLoading(false);
        }
    };

    const handleLocationChange = async (newLocation) => {
        setLocation(newLocation);
        await fetchHotspots(newLocation);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredHotspots = selectedCategory === "all"
        ? hotspots
        : hotspots.filter(hotspot => hotspot.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 pt-8">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Explore Hidden Gems
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover unique local favorites and hidden gems in your area, curated by locals who know best.
                    </p>
                </div>

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
                            Exploring gems in <span className="text-blue-600 font-semibold">{location}</span>
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
                            <HotspotCard key={hotspot.id || i} hotspot={hotspot} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-600">
                            No hotspots found in this area for the selected category. Be the first to add one!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function generateMockHotspots(location) {
    const categories = ["food", "parks", "nightlife", "shopping", "culture", "activities"];
    const mockData = [];
    const count = Math.floor(Math.random() * 10) + 5;

    for (let i = 0; i < count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];

        mockData.push({
            id: `hotspot-${i}-${Date.now()}`,
            name: getMockName(category),
            location: location,
            category: category,
            description: getMockDescription(category),
            averageSpend: Math.floor(Math.random() * 1500) + 200,
            image: `/api/placeholder/${300 + i}/${200 + i}`,
            likes: Math.floor(Math.random() * 200),
            addedBy: "Local Explorer",
            reviews: generateMockReviews(),
        });
    }

    return mockData;
}

function getMockName(category) {
    const names = {
        food: ["Spice Garden", "The Secret Kitchen", "Flavor Junction", "Cafe Nirvana", "Tandoori Nights"],
        parks: ["Tranquil Gardens", "Sunset Park", "Riverside Retreat", "Hillview Gardens", "Peace Valley"],
        nightlife: ["Starlight Lounge", "Rhythm Club", "Moonshine Bar", "Echo's Den", "Pulse Nightclub"],
        shopping: ["Heritage Bazaar", "Artisan Corner", "Local Treasures", "Craft Village", "Style Studio"],
        culture: ["Heritage Museum", "Art Hub", "Cultural Center", "Traditional Gallery", "History House"],
        activities: ["Adventure Zone", "Thrill Valley", "Explorer's Path", "Adrenaline Park", "Discovery Center"]
    };

    const categoryNames = names[category] || names.food;
    return categoryNames[Math.floor(Math.random() * categoryNames.length)];
}

function getMockDescription(category) {
    const descriptions = {
        food: "A hidden culinary gem that locals love. Features authentic recipes passed down through generations.",
        parks: "A serene green space away from the hustle and bustle, perfect for relaxation and nature walks.",
        nightlife: "An underground hotspot with great music, creative cocktails and a vibrant atmosphere.",
        shopping: "A treasure trove of unique items and handcrafted goods you won't find in commercial outlets.",
        culture: "A cultural landmark that showcases the rich heritage and artistic traditions of the region.",
        activities: "An exciting venue offering unique experiences and adventures for thrill-seekers."
    };

    return descriptions[category] || descriptions.food;
}

function generateMockReviews() {
    const count = Math.floor(Math.random() * 5);
    const reviews = [];

    for (let i = 0; i < count; i++) {
        reviews.push({
            user: `User${Math.floor(Math.random() * 1000)}`,
            text: "Great place! Definitely worth checking out.",
            rating: Math.floor(Math.random() * 2) + 4,
        });
    }

    return reviews;
}
