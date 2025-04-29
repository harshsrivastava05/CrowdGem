"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getHotspotsByLocation } from "../../lib/utils/api-client";
import HotspotCard from "../components/ui/HotspotCard";
import SearchFilters from "../components/search/SearchFilters";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SearchResults() {
    const searchParams = useSearchParams();
    const locationQuery = searchParams.get("location");

    const [hotspots, setHotspots] = useState([]);
    const [filteredHotspots, setFilteredHotspots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter state
    const [filters, setFilters] = useState({
        category: "",
        minBudget: "",
        maxBudget: "",
        sortBy: "likes", // Default sort by most liked
    });

    useEffect(() => {
        async function fetchHotspots() {
            if (!locationQuery) return;

            setLoading(true);
            try {
                const data = await getHotspotsByLocation(locationQuery);
                setHotspots(data);
                setFilteredHotspots(data);
            } catch (err) {
                console.error("Error fetching hotspots:", err);
                setError("Failed to load hotspots for this location");
            } finally {
                setLoading(false);
            }
        }

        fetchHotspots();
    }, [locationQuery]);

    useEffect(() => {
        // Apply filters
        let results = [...hotspots];

        // Apply category filter
        if (filters.category) {
            results = results.filter(spot => spot.category === filters.category);
        }

        // Apply budget filters
        if (filters.minBudget !== "") {
            results = results.filter(spot => spot.averageSpend >= Number(filters.minBudget));
        }

        if (filters.maxBudget !== "") {
            results = results.filter(spot => spot.averageSpend <= Number(filters.maxBudget));
        }

        // Apply sorting
        if (filters.sortBy === "likes") {
            results.sort((a, b) => b.likes - a.likes);
        } else if (filters.sortBy === "priceAsc") {
            results.sort((a, b) => a.averageSpend - b.averageSpend);
        } else if (filters.sortBy === "priceDesc") {
            results.sort((a, b) => b.averageSpend - a.averageSpend);
        }

        setFilteredHotspots(results);
    }, [filters, hotspots]);

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
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

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold">
                        Hotspots in {locationQuery}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters sidebar */}
                    <div className="lg:w-1/4">
                        <SearchFilters onFilterChange={handleFilterChange} />
                    </div>

                    {/* Results area */}
                    <div className="lg:w-3/4">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        ) : filteredHotspots.length === 0 ? (
                            <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-10 rounded text-center">
                                <p className="text-lg">No hotspots found for this location and filters.</p>
                                <p className="mt-2">Try adjusting your filters or be the first to add a hotspot here!</p>
                                <Link href="/add-hotspot" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition">
                                    Add a Hotspot
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <p className="mb-4 text-gray-600">{filteredHotspots.length} hotspot{filteredHotspots.length !== 1 ? 's' : ''} found</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredHotspots.map((hotspot) => (
                                        <HotspotCard
                                            key={hotspot._id}
                                            hotspot={{
                                                ...hotspot,
                                                id: hotspot._id,
                                                avgSpend: hotspot.averageSpend
                                            }}
                                            showAvgSpend={true}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}